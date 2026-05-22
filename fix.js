const fs = require('fs');
const files = ['src/components/sections/OurPlans.tsx', 'src/components/sections/OurWarranty.tsx', 'src/routes/index.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/₹¹/g, '₹');
    content = content.replace(/â€¢/g, '•');
    content = content.replace(/Â·/g, '·');
    content = content.replace(/â€”/g, '—');
    content = content.replace(/âˆž/g, '∞');
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Fixed');
