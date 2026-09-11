/* =========================================================
   GUESTBOOK CONFIGURATION
   =========================================================

   The guestbook runs on giscus, which stores every entry as a
   real GitHub Discussion in your repository. Visitors sign in
   with their GitHub account to post.

   ---------------------------------------------------------
   ONE-TIME SETUP  (about five minutes)
   ---------------------------------------------------------

   1. Push this site to a PUBLIC GitHub repository.

   2. In that repository: Settings -> General -> Features,
      and tick the "Discussions" checkbox.

   3. Install the giscus app on the repository:
      https://github.com/apps/giscus
      Choose "Only select repositories" and pick this one.

   4. Go to https://giscus.app and enter your repository name
      in the "Repository" box. Scroll down and it will show you
      a code block containing four values. Copy them in below.

      - data-repo         -> repo
      - data-repo-id      -> repoId
      - data-category     -> category      (use "Announcements"
                             or make a category called Guestbook)
      - data-category-id  -> categoryId

   5. Save this file and push. That is it - the guestbook is live.

   Until you fill these in, the guestbook page politely explains
   that it is not configured yet instead of showing a broken box.

   ========================================================= */

window.GUESTBOOK_CONFIG = {

  // e.g. "yourusername/default-studios"
  repo: "",

  // e.g. "R_kgDOK1a2b3"
  repoId: "",

  // e.g. "Announcements"
  category: "",

  // e.g. "DIC_kwDOK1a2b3c4d5"
  categoryId: "",

  // The heading that all guestbook entries hang off. Leave as is.
  term: "Default Studios Guestbook"

};
