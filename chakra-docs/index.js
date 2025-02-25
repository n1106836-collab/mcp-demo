const path = require('path')
const fs = require('fs')

fs.readdir(path.resolve(__dirname), {
  recursive: true
}, (err, files) => {
  let docs = ''
  files.forEach(file => {
    if (!file.endsWith('mdx')) {
      return
    }

    docs += `

    ${fs.readFileSync(file, 'utf-8')}

`
  });

  fs.writeFileSync('./result.mdx', docs)
});