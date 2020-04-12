const path = require('path');

const express = require("express");

const hbs = require('hbs');

const dataAccess = require('./MyModules/dataAccess');
const app = express();

const extentionsPath = path.join(__dirname, './Extensions');

var bodyParser = require('body-parser'),
 
path_jsonfile = 'Data/user.json';

var data = dataAccess.LoadJson(path_jsonfile);

 

urlencodedParser = bodyParser.urlencoded({ extended: false });
// *Define paths for express config
const viewPath = path.join(__dirname, './views');

// *setup handlebars engine and views location
app.set('view engine', 'hbs');
// app.set('vien engine','pug');
 
app.set('views', viewPath)

hbs.registerPartials(extentionsPath)
 
app.use("/Style",express.static("./Style"))
app.use("/Script",express.static("./Script"))
app.use("/Images",express.static("./Images"))
var inforCars_notEmpty=[] ;
// Lancement des pages
// app.get("/Q&A.hbs", (req, res) => {
//   res.render('Q&A');
// });
app.get("/QA.hbs", (req, res) => {

  res.render('QA',{Departement_Data});
  console.log(Departement_Data)
 
});
 
app.get("/Signup.hbs", (req, res) => {
    res.render('Signup');
  });

  app.get("/", (req, res) => {
    res.render('404');
  });
  
  app.get('/index',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

// Port
var port =  3000;
app.listen(port,() => console.log(`Listening on port ${port}...`));
/*server local*/
 
 //check login :
 app.post('/login',urlencodedParser, function (req, res) {

  var Userlogin = dataAccess.LoadJson(path_jsonfile);
  var email =req.body.email;
  var passWord = req.body.password;
  
  var found =false;
  
  for(var i=0;i<Userlogin.length;i++)
  {
    if(email==Userlogin[i].email&& passWord==Userlogin[i].passWord)
    {
     var Userlogged=Userlogin[i]; 
      found=true;
      break;
    }
   
  }
  if(found==true )
  {
    if(Userlogged.role=="Admin")
    {
      var pathJson_Cars = 'Data/voiture.json';
      var infoCars= dataAccess.LoadJson(pathJson_Cars);
      
      var j=0;
      for(var i=0;i<infoCars.length;i++)
      {
        if(infoCars[i].Year!='')
        {
          inforCars_notEmpty[j]=infoCars[i];
          j++;
        }
      }
      res.render('Admin_Dash',{inforCars_notEmpty});
      console.log(inforCars_notEmpty);
    }
    else
 
      res.render('Signup_done',{Userlogged});
 
  }
  else
  {
    res.render('Signup_NotDone');
  }


});

//update cars 
app.post('/update',urlencodedParser, function (req, res) {
  console.log("this is what i am getting from req");
  var pathJson_Cars = 'Data/voiture.json';
  var CarData = dataAccess.LoadJson(pathJson_Cars);
  var DataALL = [];

  for(var i=0;i<CarData.length;i++)
  {
    if(req.body.Year[i]!='' && req.body.Price[i]!='')
    {
      var dataToPush =
      {
        IdCar  : CarData[i].IdCar,
        Year : req.body.Year[i],
        Make:req.body.Make[i],
        Model :req.body.Model[i],
        Mileage     :req.body.Mileage[i],
        Drivetrain   :req.body.Drivetrain[i],
        ExteriorColor : req.body.ExteriorColor[i],
        InteriorColor:req.body.InteriorColor[i],
        Doors :req.body.Doors[i],
        Price     :req.body.Price[i],
        Image   :req.body.ImageInput[i]
        
    
      };
    }
     DataALL.push(dataToPush);
    
  }
  console.log(DataALL);
   dataAccess.SaveJson(pathJson_Cars,DataALL);
  //  res.render('Admin_Dash',{inforCars_notEmpty});
  


});

app.post('/DeleteCar',urlencodedParser, function (req, res) {

 var pathJson_Cars = 'Data/voiture.json';
  var CarData = dataAccess.LoadJson(pathJson_Cars);
  var selectedCar = req.body.idCarInput[0];
  var newCarData = [];
  for(var i=0;i<CarData.length;i++)
  {
    if(CarData[i].IdCar!=selectedCar)
    {
      newCarData.push(CarData[i]);
    }

  }
  dataAccess.SaveJson(pathJson_Cars,newCarData);
 
   

})
//add cars
app.post('/addCar',urlencodedParser, function (req, res) {
  var pathJson_Cars = 'Data/voiture.json';
  var CarData = dataAccess.LoadJson(pathJson_Cars);
  console.log("I am adding cars now ")
   console.log(req.body);
  var id=Number(CarData[CarData.length - 1].IdCar) + 1;
   
  var dataToPush =
      {
        IdCar  : id,
        Year : req.body.Year,
        Make:req.body.Make,
        Model :req.body.Model,
        Mileage     :req.body.Mileage,
        Drivetrain   :req.body.Drivetrain,
        ExteriorColor : req.body.ExteriorColor,
        InteriorColor:req.body.InteriorColor,
        Doors :req.body.Doors,
        Price     :req.body.Price,
        Image   :"Images/"+req.body.ImageAdd
        
    
    };
      console.log(dataToPush);

     CarData.push(dataToPush);
  
     dataAccess.SaveJson(pathJson_Cars,CarData);
    //  res.render('Admin_Dash',{inforCars_notEmpty});

});
 
//l'ajout d'un nouveau utilisateur
app.post('/register',urlencodedParser, function (req, res) {
    
  var methode = User.prototype;
   function User(nom,prenom,email,cin,password,role)
   {
       this.nom= nom;
       this.prenom= prenom;
       this.email= email;
       this.cin= cin;
       this.password=password;
       this.role=role;
      

   } 
   console.log(req.body);
 
   var user1 = new User(req.body.prenom,req.body.nom,req.body.email,req.body.cin,req.body.pw,'user') ;
 
      // data.persons.forEach(element => {
        
      //     console.log(element.Cin.split("#"));
      // });
      var list_emails= [] ;
      var j=0;

      data.forEach(element => {
        
        list_emails [j]= element.email ;
        j++;
    });

      console.log(req.body.cin);
 
      console.log(list_emails.length);
     


      function Search_Data_Exist(cible,arr)
{
  var trouve = false;

  for(var i=0;i<arr.length;i++)
  {
    if(arr[i]==cible)
    {
       
      trouve=true;
      console.log(arr[i]);
      break;
     
    }

  }
 
    if(trouve==false)
    {
        return -1;
    }
    else 
    return 1;

   


}

    var test=Search_Data_Exist(req.body.cin,list_emails);
 


   
      if(test==-1)
      {
        var dataToPush =
        {
          idCard  : user1.cin,
          role : user1.role,
          firstName:user1.nom,
          lastName :user1.prenom,
          email     :user1.email,
          passWord     :user1.password
          
      
      };
    }
        //    push_Data();
        console.log(dataToPush);
        data.push(dataToPush);
         dataAccess.SaveJson(path_jsonfile,data);
      //  res.render('registeration_Done.hbs');

      // }
      // else
      // {
      //   res.render('registeration_undone.hbs');

      // }

 
  
});

app.post('/reservation',urlencodedParser, function (req, res) {

  var methode_question = Reservation.prototype;
  function Reservation (idCard,idReservation,car,dateDebut,dateFin,prix)
  {
          this.idCard=idCard;
          this.idReservation= idReservation;
          this.car= car;
          this.dateDebut=dateDebut;
          this.dateFin=dateFin;
          this.prix=prix;

  }
  
      
    
  var ReservationData = dataAccess.LoadJson('Data/reservation.json');

  Save_Data(ReservationData);
  // res.render('msg_sent');

  function Save_Data (obj)
 
  {
    var id=obj[obj.length - 1].idReservation + 1;
    var R1 = new Reservation(req.body.idCard,id,req.body.car,req.body.startDate,req.body.endDate,req.body.price);
    console.log(R1);
    var dataToPush =
        {
          idCard  : R1.idCard,
          idReservation : R1.idReservation,
          car:R1.car,
          dateDebut :R1.dateDebut,
          dateFin     :R1.dateFin,
          prix   :R1.prix,
          
      
      };
       console.log(dataToPush);

       obj.push(dataToPush);
      
      dataAccess.SaveJson('Data/reservation.json',obj);

  }


 });


 


