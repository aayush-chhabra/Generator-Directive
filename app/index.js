'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var vm = require('vm');
var sys = require('sys'),
    exec =require('child_process').exec;

var fileNameString="Aayush";   //name with hiphens 
var moduleNameString=""; //name without spaces
var modulesInTheFolder=[];
var fileForFurtherUse = "";
var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    // this.on('end', function () {
    //   if (!this.options['skip-install']) {
    //     this.installDependencies();
    //   }
    // });
  },

  askFor: function () {
    
    //console.log(fileNameString);
    var obj = this;
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Module generator!'));

    var prompts = [{
      type: 'input',
      name: 'nameController',
      message: 'Please enter the name of the Directive: ',
      default: "Hello World"
    }];
    this.prompt(prompts, function (props) {
      
      //module creation 
      this.nameController = props.nameController;
      fileNameString = this.nameController;
      fileNameString = fileNameString.split(' ').join('-');
      fileForFurtherUse = fileNameString;
      fileNameString=fileNameString.concat("-directive");
      moduleNameString = this.nameController;
      moduleNameString =  moduleNameString.split(' ').join('');
      moduleNameString=moduleNameString.concat("directive");
      // this.mkdir(fileNameString);
      // fileNameString = fileNameString+"/module.js";
      // var context = { 
      //   moduleNameString1: moduleNameString 
      // };
      // this.template('_module.js', fileNameString,context);
      // var indexFile = this.readFileAsString("modules.json");
      // console.log("Please select one of the below mentioned modules: ");
      // console.log(indexFile);

      // var code = 'exec( "ls", function(error, stdout, stderr) {' + 
      //      '  console.log("Please Select one of the Modules: " + stdout)' +
      //      '});';
      // vm.runInThisContext(code);
      //var prompts1=[];
      obj.destinationRoot("app/static/js/");
      exec('ls -d -- */',function (error, stdout, stderr) {
      modulesInTheFolder = stdout;
      modulesInTheFolder = modulesInTheFolder.split("\n");
      modulesInTheFolder.splice(modulesInTheFolder.length-1,1);
      var prompts1 = [{
      type: 'list',
      name: 'nameModule',
      message: 'Please enter the name of the module: ',
      choices: modulesInTheFolder,
      default : modulesInTheFolder[0]
      }];
      obj.prompt(prompts1,function (props1)
      {
        this.nameModule = props1.nameModule;
        //console.log(modulesInTheFolder[0]);
        //var destinationPath = obj.destinationRoot() + "/" + this.nameModule + "/main.js";
        var destPath = obj.destinationRoot() + "/" + this.nameModule + "/" + fileNameString + ".js";
        //var destiPath = obj.destinationRoot() + "/" + this.nameModule + "/" + fileForFurtherUse + ".html";
        //var destinationPath1 = obj.destinationRoot() + "/" + this.nameModule + "/module.js";
        //var indexFile = obj.read(destinationPath);
        
        var cont1 = {
          directiveDescription: moduleNameString
        }
        
        obj.template("_directive.js", destPath, cont1);

        // var stringToInsert = ","+"'./"+fileNameString+"'"+"\n"+"//yeoman_hook";
        // var res = indexFile.replace("//yeoman_hook", stringToInsert);
        // var filePath = this.nameModule + "/main.js";
        //obj.write(filePath,res);
        done();
      });
      });
      //console.log(modulesInTheFolder[0]);
      //for(var z=0; z<modulesInTheFolder.length;z++);
      //console.log(modulesInTheFolder[1]);
      
      
      
    }.bind(this));
  },

   addModuletoModule_json: function () {
       var flagToCheckModule = 0;
       //this.copy("_controller.js","controller.js");
      // try
      // {
      //   var destinationPath = this.destinationRoot() + "/modules.json";
      //   this.read(destinationPath);
      // }
      // catch(err)
      // {
      //   this.write("modules.json",moduleNameString);
      //   flagToCheckModule=1;
      // }
      // finally
      // {
      //   if(flagToCheckModule==0)
      //   {
      //     var indexFile = this.readFileAsString("modules.json");
      //      indexFile = indexFile.concat("\n"+moduleNameString);
      //      this.write("modules.json",indexFile);
      //   }
      // }
   }
});

module.exports = ModuleGenerator;
