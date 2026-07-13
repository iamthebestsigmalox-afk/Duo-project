import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
// Runs only on the server. Uses the service-role client so we can look up
// auth.users by email without RLS getting in the way.
export const checkEmailRegistered = createServerFn({ method: "POST" })
    .validator(z.object({ email: z.string().email() }))
    .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const target = data.email.trim().toLowerCase();
    // The admin API doesn't offer a direct "get by email" call, so we page
    // through users and match by email. Fine for a small shop's user base.
    let page = 1;
    const perPage = 1000;
    for (let i = 0; i < 20; i++) {
        const { data: result, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
        if (error)
            throw error;
        const found = result.users.some((u) => u.email?.toLowerCase() === target);
        if (found)
            return { registered: true };
        if (result.users.length < perPage)
            break;
        page++;
    }
    return { registered: false };
});
