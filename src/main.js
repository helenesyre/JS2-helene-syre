import { router } from "../src/assets/js/router/index.js";
import { renderFooter } from '../src/assets/js/components/footer.js';

// Render footer
document.getElementById('footer').innerHTML = renderFooter();

router();