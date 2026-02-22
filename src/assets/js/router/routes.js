import { comingSoon } from "../../../pages/comingSoon";
import { home } from "../../../pages/home";
import { login } from "../../../pages/login";
import { postPage } from "../../../pages/postPage";
import { profile } from "../../../pages/profile";
import { register } from "../../../pages/register";
import cleanLayout from "../components/layouts/cleanLayout";
import { profileSidebar } from "../components/profileSidebar";

/**
 * Defines the routes for the application, mapping URL hash patterns to their corresponding
 * view functions and layout configurations. Each route object contains a regex pattern for
 * matching the URL hash, a view function that returns the HTML content for that route, and
 * optional properties for layout and sidebar configurations.
 */
export const routes = [
  {
    path: /^#\/$/,
    view: home,
  },
  {
    path: /^#\/profile\/([^\/]+)/,
    view: profile,
    sidebar: profileSidebar,
  },
  {
    path: /^#\/post\/([^\/]+)/,
    view: postPage
  },
  {
    path: /^#\/register$/,
    view: register,
    layout: cleanLayout,
    noContentClass: true
  },
  {
    path: /^#\/login$/,
    view: login,
    layout: cleanLayout,
    noContentClass: true
  },
  {
    path: /^#\/comingSoon$/,
    view: comingSoon
  },
  {
    path: /^#\/saved-posts$/,
    view: comingSoon
  },
  {
    path: /^#\/messages$/,
    view: comingSoon
  },
  {
    path: /^#\/notifications$/,
    view: comingSoon
  },
  {
    path: /^#\/create$/,
    view: comingSoon
  }
]