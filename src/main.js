import { router } from "../src/assets/js/router/index.js";
import { renderNav } from '../src/assets/js/components/navigation.js';
import { renderFooter } from '../src/assets/js/components/footer.js';

// Render navigation
document.getElementById('navbar').innerHTML = renderNav();

// Render footer
//document.getElementById('footer').innerHTML = renderFooter();

router();