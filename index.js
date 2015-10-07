var eejs = require('ep_etherpad-lite/node/eejs/')
  , path = require('path')
  , fs = require('fs')
  , settings =
    { githubUrl: 'http://github.com/ether/etherpad-lite/'
    }
  , gitref = ""

//try to get the git version
var rootPath = path.resolve(__dirname, '../..')
if (fs.lstatSync(rootPath + '/.git').isFile()) {
  rootPath = fs.readFileSync(rootPath + '/.git', "utf8");
  rootPath = rootPath.split(' ').pop().trim();
} else {
  rootPath += '/.git';
}
var ref = fs.readFile(rootPath + "/HEAD", "utf-8", function(err, branch) {
  if(err) return console.error(err);
  branchPath = branch.substring(5, branch.indexOf("\n"))
  fs.readFile(rootPath+"/"+branchPath, "utf-8", function(err, head) {
    if(err) return console.error(err);
    gitref = head.substring(0, 6)
    console.log("ep_infopanel: Ep-lite git revision: "+gitref)
  })
})

exports.eejsBlock_globalSettings = function(hook_name, args, cb) {
  args.content += eejs.require('ep_infopanel/templates/infopanel.ejs',
  { gitRev: gitref
  , githubLink: settings.githubUrl+'commit/'+gitref
  , homepage: settings.githubUrl
  })
  cb()
}
