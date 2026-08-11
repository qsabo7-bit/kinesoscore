# Auth email templates (mobile-tappable)

Paste these into **Supabase Dashboard → Authentication → Email Templates**.

Each template uses a large button (`min-height: 48px`) with `href="{{ .ConfirmationURL }}"` so confirmation / reset links are easy to tap on phones. Avoid relying on a bare pasted URL — long verify links wrap and break in many mail apps.

## Apply (hosted project)

1. Open [Email Templates](https://supabase.com/dashboard/project/_/auth/templates).
2. For each template below, paste the matching HTML from this folder into the **Body** field and save.

| Dashboard template   | File                    | Suggested subject                          |
| -------------------- | ----------------------- | ------------------------------------------ |
| Confirm sign up      | `confirmation.html`     | Confirm your KinesoScore email             |
| Reset password       | `recovery.html`         | Reset your KinesoScore password            |
| Magic Link           | `magic_link.html`       | Your KinesoScore sign-in link              |
| Change email address | `email_change.html`     | Confirm your new KinesoScore email         |
| Invite user          | `invite.html`           | You’re invited to KinesoScore              |

3. Send yourself a test signup / reset from a phone and confirm the green button opens.

## Notes

- Do **not** enable email-link tracking on your SMTP provider — it rewrites URLs and breaks auth.
- Keep Site URL / redirect allow list pointing at `https://kinesoscore.com` (and localhost for dev).
