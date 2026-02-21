import { comingSoon } from "../../../pages/comingSoon";
import { home } from "../../../pages/home";
import { login } from "../../../pages/login";
import { postPage } from "../../../pages/postPage";
import { profile } from "../../../pages/profile";
import { register } from "../../../pages/register";
import cleanLayout from "../components/layouts/cleanLayout";
import { profileSidebar } from "../components/profileSidebar";

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