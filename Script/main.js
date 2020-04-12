function myFunction() {
    var x = document.getElementById("myTopnav");
    
   
        if (x.style.display === "block") {
            x.style.display = "none";
          } else {
       
            x.style.display = "block";
           
      
          }
         

        }
/*Icons Display color*/

 
    var DI = document.getElementsByClassName("display_icons");

    DI[0].addEventListener('click',()=>{  
         
        DI[0].style.color="crimson";
        DI[1].style.color="silver";
            });
            DI[1].addEventListener('click',()=>{        
                DI[1].style.color="crimson";
                DI[0].style.color="silver";
             
                    });
  

/** */

        /**Classe Voiture */

        class Car {
          
            constructor(brand,year,model,mileage,drivetrain,exteriorColor,interiorColor,doors,price) {
                this._Brand = brand;
                this._Year=year;
                this._Model=model;
                this._Mileage=mileage;
                this._Drivetrain=drivetrain;
                this._ExteriorColor=exteriorColor;
                this._InteriorColor=interiorColor;
                this._Doors=doors;
                this._Price=price;

    
              }
        }
        var selectedCar = [] ;
          selectedCar[0] = new Car ("Audi",2011,"A4",125.367,"All Wheel Drive","Black","Black","4 Doors","$7.500");
          selectedCar[1] = new Car ("Chevrolet",2014,"Impala",46.055,"Front Wheel Drive","White","Gray","4 Doors","$10.500");
          selectedCar[2] = new Car ("Dodge",2016,"Challenger",100.433,"Rear Wheel Drive","Red","Black","2 Doors","$13.500");
          selectedCar[3] = new Car ("GMC",2012,"Acadia",109.760,"Front Wheel Drive","Black","Beige","4 Doors","$11.500");

         /*Class Utilisateur */
         //regex Expressions needed
         var reg_name=RegExp("^[a-zA-Z]{3,20}$");
         var reg_mail =RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
         var reg_cin =RegExp("^[a-zA-Z]{2}[0-9]{6}$");

         class User{
         
          _Error =[] ;
           constructor (cin,firstName,lastName,email,password)
           {
             
             if(reg_cin.test(cin) ) 
             {
              this._Cin =cin;
             }
             else
             {
              this._Error[0]="CIN invalide";
             }
             if(reg_name.test(firstName))
             {
              this._FirstName=firstName;
             }
             else
             {
              this._Error[1]="First name invalide" ;

             }
             if(reg_name.test(lastName))
             {
              this._LastName=lastName;
             }
             else
             {
              this._Error[2]="Last name invalide" ;

             }
             if(reg_mail.test(email))
             {
              this._Email=email;
             }
             else
             {
              this._Error[3]="Email invalide" ;

             }
             if(password.length>=6)
             {
              this._Password=password;
             }
             else
             {
              this._Error[4]="Password too short";
              this._Error[5]="Please enter a valid password to confirm";

             }
                        
            
             
             
             
           }
         }
         // Variables needed 
         var v_cin = document.getElementById("id_Cin");
         var v_firstname= document.getElementById("id_firstName");
         var v_lastname= document.getElementById("id_LastName");
         var v_email= document.getElementById("id_Email");
         var v_password= document.getElementById("id_Password");
         var v_confirmpw= document.getElementById("id_ConfirmPw");
         var output_errors = document.getElementsByClassName("register_error");

         //variables needed for reservation 
         var vr_cin = document.getElementById("id_Cin_reservation");
         var vr_car = document.getElementById("id_car_reservation");
         var vr_firstname= document.getElementById("id_firstName_reservation");
         var vr_lastname= document.getElementById("id_LastName_reservation");
         var vr_email= document.getElementById("id_Email_reservation");
         var vr_DateFin = new Date(document.getElementById("id_Edate_reservation").value);
         var vr_DateDebut = new Date(document.getElementById("id_Sdate_reservation").value);
     
 
         
  // var RegisteredUser = new User  ("hh112313","Mehdi","choukri","mehid@gmail.com","123456");
         
         //Le bouton register

         var RegisteredUser ;
         var BR = document.getElementsByClassName("contactUs_Modal--main--field--BoutonRegister");
         BR[0].addEventListener("click",()=>{
          RegisteredUser = new User (v_cin.value.toUpperCase(),v_firstname.value.toUpperCase(),v_lastname.value.toUpperCase(),v_email.value.toUpperCase(),v_password.value.toUpperCase());
           
           
           for(let i=0;i<output_errors.length;i++)
           {
              
            if(RegisteredUser._Error[i]!=null)
            {

              output_errors[i].innerHTML=RegisteredUser._Error[i];
              output_errors[i].style.color="red";
            }
            else
            {
              output_errors[i].innerHTML="";
            }

           }
         

            console.log(RegisteredUser)
        if(RegisteredUser._Error.length==0)
        {
          remplir_champs_reservation (RegisteredUser._Cin,selectedCarForReservation,RegisteredUser._FirstName,RegisteredUser._LastName,RegisteredUser._Email)
          register_confirmation_cancel('.contactUs_Modal');
          register_confirmation_popUp('.reservationModel');
   
          
        }
             
 
            
            
            
          }

         )
         /*function de check si le password est identique */
        function check_confirmPW()
         {
          if (v_password.value ==v_confirmpw.value) {
          document.getElementById('id_confirm_pw_error').style.color = 'green';
          document.getElementById('id_confirm_pw_error').innerHTML = 'Matching';
        } else {
          document.getElementById('id_confirm_pw_error').style.color = 'red';
          document.getElementById('id_confirm_pw_error').innerHTML = 'Not matching';
        }

         }
         function cancel (target_arrg)
         {
           var target = document.querySelectorAll( target_arrg );
 
           for(var i=0;i<target.length;i++)
           {
          
             target[i].value="";
            
           }
           


         }
         var btn_SignIn = document.getElementById('id_SignInButton');
         btn_SignIn.addEventListener('click',()=>{
          register_confirmation_popUp('.login_Modal');
            
         })
         
         var btn_CloseSignIn = document.getElementById('id_close_login');
         btn_CloseSignIn.addEventListener('click',()=>{
          register_confirmation_cancel('.login_Modal');
          register_confirmation_cancel('.messageBox');
        
         })

         /*Cancel button*/
         var BC = document.getElementsByClassName("contactUs_Modal--main--field--BoutonCancel");
         BC[0].addEventListener("click",()=>{
          cancel ("input[type=text]");

         })
         //profile checker button

         function register_confirmation_popUp(popUp_arrgs)
         {
          document.querySelector(popUp_arrgs).style.display = "block";
         }
         function register_confirmation_cancel(cancel_arrgs)
         {
          document.querySelector(cancel_arrgs).style.display = "none";
         }

         var Bcheck = document.getElementById("id_profile");
         Bcheck.addEventListener("click",()=>{
           if(RegisteredUser==null)
           {
            register_confirmation_popUp('.messageBox');
           }
          
         })
         
        //  var BNotNow = document.getElementById("id_notNowButton");
        //  BNotNow.addEventListener("click",()=>{
        //   register_confirmation_cancel('.messageBox');
        //  })
         var BRegister =document.getElementById("id_btn_register");
         BRegister.addEventListener("click",()=>{
          document.querySelector('.contactUs_Modal').style.display = "block";
          register_confirmation_cancel('.messageBox');
         })
         //Buy and rent Buttons 
         //buy
         var Bbuy = document.getElementById("id_buyBouton");
         Bbuy.addEventListener("click",()=>{
          register_confirmation_popUp('.messageBox2');
         


         })
         var BbackNow = document.getElementById("id_BackNowButton");
         BbackNow.addEventListener("click",()=>{
          register_confirmation_cancel('.messageBox2');
         })
         //close icons reservation 
         var IconCloseReservation =document.getElementById("id_close_reservation"); 
         IconCloseReservation.addEventListener("click",()=>{
          register_confirmation_cancel('.reservationModel');
         })
//display message function 

function display_Message(message)
{
  var MpopUp= document.getElementById("id_msg_popUP");
  MpopUp.style.display="block";
  var msg=document.getElementById("id_msgTxt");
  msg.innerHTML=message;


}


         

         /** */
// function de remplissage du tableau
function remplir_tableau (voiture,indice)
{
    var element = document.getElementsByClassName("table-infos");
    

    element[1].innerHTML=voiture[indice]._Year;
    element[3].innerHTML=voiture[indice]._Brand;
    element[5].innerHTML=voiture[indice]._Model;
    element[7].innerHTML=voiture[indice]._Mileage;
    element[9].innerHTML=voiture[indice]._Drivetrain;
    element[11].innerHTML=voiture[indice]._ExteriorColor;
    element[13].innerHTML=voiture[indice]._InteriorColor;
    element[15].innerHTML=voiture[indice]._Doors;
    element[18].innerHTML=voiture[indice]._Price;
  
    


}
       
//class resrevation 
class Reservation {
  reservationError ;
  constructor (idCard,car,sdate,edate,price)
  {
    this._idCard=idCard;
    this._Car=car;
    
    this._StartDate=sdate;
    this._EndDate=edate;
    if(DaysCalculator()!=-1)
    {
      this._Price=PriceCalculator(price,DaysCalculator());
    }
    else
    {
      this.reservationError="End Date should be Superior to the Start date";
    }

    

  }
 
}
function DaysCalculator()
{
   
  var DateFin = new Date(document.getElementById("id_Edate_reservation").value);
  var DateDebut = new Date(document.getElementById("id_Sdate_reservation").value);
  var nbr_jours=parseInt((DateFin - DateDebut) / (24 * 3600 * 1000));
  if( nbr_jours>0)
  {
    return nbr_jours;

  }
  else
  return -1;
   
}
function PriceCalculator (Price,days)
{
  var string_length = Price.length;
  var Price = Number(Price.substring(1,string_length));
 
  var rentPrice =Number(((Price*1000)/365))*days;
return Math.ceil(rentPrice);
}
function remplir_champs_reservation (idcard,car,Fname,Lname,email)
{
  vr_cin.value=idcard;
  vr_car.value=car;
  vr_firstname.value=Fname;
  vr_lastname.value=Lname;
  vr_email.value=email;
 
}


 
var choix="";
  /*POP UP Bouton  */
   var b= document.getElementsByClassName("button-1");

   var bContact = document.getElementsByClassName("button-2");

   var bReserve= document.getElementsByClassName("button-3");

   var selectedCarForReservation ;
/**resolution du probleme du click pour chaque bouton */

   b[0].addEventListener('click',()=>{        
    choix=selectedCar[0]._Brand;
    console.log(selectedCar[0]);
    remplir_tableau (selectedCar,0);
    plusDivs(+1,'Images/Slider-img/',choix); 
        });
        b[1].addEventListener('click',()=>{        
            choix=selectedCar[1]._Brand;
            remplir_tableau (selectedCar,1);
            plusDivs(+1,'Images/Slider-img/',choix); 
                });
                b[2].addEventListener('click',()=>{        
                    choix=selectedCar[2]._Brand;
                    remplir_tableau (selectedCar,2);
                    plusDivs(+1,'Images/Slider-img/',choix);   
                        });
                        b[3].addEventListener('click',()=>{        
                            choix=selectedCar[3]._Brand;
                            remplir_tableau (selectedCar,3);
                            plusDivs(+1,'Images/Slider-img/',choix);    
                                });

   
  for(var i=0;i<4;i++)
  {
   b[i].addEventListener('click',()=>{   
     
          document.querySelector('.bg-modal').style.display = "flex";
            });

     bContact[i].addEventListener('click',()=>{   
     
      document.querySelector('.contactUs_Modal').style.display = "block";
        }); 
        // bReserve[i].addEventListener('click',()=>{   
     
        //   document.querySelector('.reservationModel').style.display = "block";
        //     });   

  }
  //remplissage la popUp de reservation
  var index;
  bReserve[0].addEventListener('click',()=>{        
    selectedCarForReservation=selectedCar[0]._Brand;
    index=0;
    if(RegisteredUser==null)
    {
     register_confirmation_popUp('.messageBox');
    }
    else
    {
       
    remplir_champs_reservation (RegisteredUser._Cin,selectedCarForReservation,RegisteredUser._FirstName,RegisteredUser._LastName,RegisteredUser._Email)
    document.querySelector('.reservationModel').style.display = "block";
    }
   
     
        });
        bReserve[1].addEventListener('click',()=>{        
          selectedCarForReservation=selectedCar[1]._Brand;
          if(RegisteredUser==null)
          {
           register_confirmation_popUp('.messageBox');
          }
          else
          {
             
          remplir_champs_reservation (RegisteredUser._Cin,selectedCarForReservation,RegisteredUser._FirstName,RegisteredUser._LastName,RegisteredUser._Email)
          document.querySelector('.reservationModel').style.display = "block";
          }
           index=1;
                });
                bReserve[2].addEventListener('click',()=>{        
                  selectedCarForReservation=selectedCar[2]._Brand;
                  if(RegisteredUser==null)
                  {
                  register_confirmation_popUp('.messageBox');
                  }
                  else
                  {
                    
                  remplir_champs_reservation (RegisteredUser._Cin,selectedCarForReservation,RegisteredUser._FirstName,RegisteredUser._LastName,RegisteredUser._Email)
                  document.querySelector('.reservationModel').style.display = "block";
                  }
                  index=2;
                        });
                        bReserve[3].addEventListener('click',()=>{        
                          selectedCarForReservation=selectedCar[3]._Brand;
                          if(RegisteredUser==null)
                          {
                           register_confirmation_popUp('.messageBox');
                          }
                          else
                          {
                             
                          remplir_champs_reservation (RegisteredUser._Cin,selectedCarForReservation,RegisteredUser._FirstName,RegisteredUser._LastName,RegisteredUser._Email)
                          document.querySelector('.reservationModel').style.display = "block";
                          }
                            index=3;
                                });

                                /***************/
 
  document.getElementById('id_close_contactus').addEventListener("click",()=>{
     
    document.querySelector('.login_Modal').style.display = "none!important";
    document.querySelector('.contactUs_Modal').style.display = "none";
    
     
  });
            document.getElementById('id_close').addEventListener("click",()=>{
              document.querySelector('.bg-modal').style.display = "none";
               
            });

// Faire une fonction qui ecoute un evenement au lieu de faire onclick en html

           var btn_slide_left=document.getElementsByClassName("w3-button w3-display-left");
           var btn_slide_right=document.getElementsByClassName("w3-button w3-display-right");
           btn_slide_left[0].addEventListener('click',()=>{   
            plusDivs(-1,'Images/Slider-img/',choix);
            
              });

              btn_slide_right[0].addEventListener('click',()=>{   
                plusDivs(+1,'Images/Slider-img/',choix);
                
                  });

                  //L'utilisation de la classe Reservation via un bouton de Apply
                  var Bapply =  document.getElementsByClassName("contactUs_Modal--main--field--BoutonApply");
                  var BConfirm = document.getElementsByClassName("ConfirmReservationModel");


                  Bapply[0].addEventListener("click",()=>{
                    var dateD=document.getElementById("id_Sdate_reservation").value;
                    var dateF=document.getElementById("id_Edate_reservation").value;
                    var ConfirmCar = document.getElementsByClassName("ConfirmReservationModel--Car");

                    var SpanConfirm = document.getElementsByClassName("reservationConfirm_span");
                     
                    var Applyreserved = new Reservation(RegisteredUser._Cin,selectedCar[index]._Brand,dateD,dateF,selectedCar[index]._Price);
                    console.log(Applyreserved);
                    if(Applyreserved.reservationError==null)
                    {
                      register_confirmation_cancel('.reservationModel');
                      register_confirmation_popUp('.ConfirmReservationModel');
                      ConfirmCar[0].src="Images/"+selectedCar[index]._Brand+".jpg";
                      ConfirmCar[0].width="300";
                      ConfirmCar[0].height="200";

                      SpanConfirm[0].innerHTML=RegisteredUser._Cin.toUpperCase();
                      SpanConfirm[1].innerHTML=selectedCar[index]._Brand.toUpperCase();
                      SpanConfirm[2].innerHTML=RegisteredUser._FirstName.toUpperCase();
                      SpanConfirm[3].innerHTML=RegisteredUser._LastName.toUpperCase();
                      SpanConfirm[4].innerHTML=DaysCalculator();
                      SpanConfirm[5].innerHTML="$ "+Applyreserved._Price;






                    }
                  
                    
                     
  
                    
                  })

                  var closeConfirmation = document.getElementById("id_close_Confirmreservation");
                  var closeConfirmationbtn = document.getElementsByClassName("contactUs_Modal--main--field--BoutonGoBack");

                  closeConfirmation.addEventListener("click",()=>{
                    
                    register_confirmation_cancel('.ConfirmReservationModel');
                  })

                  closeConfirmationbtn[0].addEventListener("click",()=>{
                    
                    register_confirmation_cancel('.ConfirmReservationModel');
                  })
                  
                  BConfirm[0].addEventListener("click",()=>{

                    var soldCar = document.getElementsByClassName("sold_car");


                    soldCar[index].src="Images/"+selectedCar[index]._Brand+"Sold.jpg";
                    register_confirmation_cancel('.ConfirmReservationModel');




                  })

                  function OnchangeDateToCalculatePrice()
                  {
                    if(PriceCalculator(selectedCar[index]._Price,DaysCalculator())>0)
                    {
                      document.getElementById("id_price_reservation").value=PriceCalculator(selectedCar[index]._Price,DaysCalculator());
                      document.getElementById("price_error").innerHTML="";
                    }
                    else
                    {
                      document.getElementById("price_error").innerHTML="The end Date must be superior";
                      document.getElementById("price_error").style.color="red";
                    
                    }
                 
                  }
          
/*Slider Details*/
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n,source,choix) {
  showDivs(slideIndex += n,source,choix);
}

function showDivs(n,source,choix) {
  var i;
  
  source=source+choix+(slideIndex)+".jpg";
  var R = document.getElementsByClassName("mySlides");
  if (n > R.length) {slideIndex = 1}
  if (n < 1) {slideIndex = R.length} ;
  for (i = 0; i < R.length; i++) {
    R[i].style.display = "none";
   
    R[i].src=source;
    console.log(source);
    console.log("slideIndex :"+slideIndex);
  }
  R[slideIndex-1].style.display = "block";
}
            
   
   
  /**************/
  var cpt=1;
  function language_click()
  {
    var x = document.getElementById("id_other_language");
    var liste  =document.getElementsByClassName("menu_link_name");
    var liste_ENG= ["HOME","GALLERY","ABOUT US","CONTACT US","CREDIT APPLICATION","EN"];
    for(var i=0;i<liste.length;i++)
    {
     liste[i].innerHTML=liste_ENG[i];
     

    }
      if(cpt%2!=0)
      {
        x.style.display = "block";
  
      }
      else
      {
        x.style.display = "none";
      }
      cpt++;
      document.getElementById("id_lang").innerHTML="FR";
      
    
  }
  function language_Changer()
  {
      var langue = document.getElementById("id_lang");
      var liste  =document.getElementsByClassName("menu_link_name");
      var liste_btn = document.getElementsByClassName("lang_btn");
      var liste_table_default = document.getElementsByClassName("table-info-1");
      console.log(liste_table_default.length)

      if(langue.innerHTML==="FR")
      {
        var liste_fr = ["ACCUEIL","GALLERIE","A PROPOS","CONTACTER","CREDIT","FR"];
        var liste_btn_fr = ["Voir les disponibilités","Contactez nous","Plus de details","Voir les disponibilités","Contactez nous","Plus de details","Voir les disponibilités","Contactez nous","Plus de details","Voir les disponibilités","Contactez nous","Plus de details"];
        var liste_popUp_Table_fr=["Année :","Marque :","Modele :","Kilométrage :","Transmission :","Couleur extérieure :","Couleur intérieure :","Portes :","Achat","Location","Prix","Planifiez un essai-routier","Donner-nous votre prix","Faire une demande de location","Contactez nous"];
    
        for(var i=0;i<liste_table_default.length;i++)
      {
        liste_table_default[i].innerHTML=liste_popUp_Table_fr[i];
      }

        for(var i=0;i<liste.length;i++)
        {
         liste[i].innerHTML=liste_fr[i];
         
 
        }
        for(var i=0;i<liste_btn.length;i++)
        {
            liste_btn[i].innerHTML=liste_btn_fr[i];
        }
        document.getElementById("id_lang").innerHTML="EN";

      }
      else if (langue.innerHTML==="EN")
      {
           
        var liste  =document.getElementsByClassName("menu_link_name");
        var liste_ENG= ["HOME","GALLERY","ABOUT US","CONTACT US","CREDIT APPLICATION","EN"];
        var liste_btn_eng =["Check Availability","Contact us","View Details","Check Availability","Contact us","View Details","Check Availability","Contact us","View Details","Check Availability","Contact us","View Details","Check Availability","Contact us","View Details"];
        var liste_popUp_Table_ENG=["Year :","Make :","Model:","Mileage :","Drivetrain  :","Exterior color :","Interior color :","Doors :","Buy","Rent","Price","Schedule a Test-Drive","Name Your Price","Apply For a Rent Application","Contact Us"];

        for(var i=0;i<liste_table_default.length;i++)
      {
        liste_table_default[i].innerHTML=liste_popUp_Table_ENG[i];
      }

        for(var i=0;i<liste.length;i++)
        {
         liste[i].innerHTML=liste_ENG[i];
         
    
        }
        for(var i=0;i<liste_btn.length;i++)
        {
            liste_btn[i].innerHTML=liste_btn_eng[i];
        }
        document.getElementById("id_lang").innerHTML="FR";

      }
      

      
      
  }
  /*Menu resize correction*/
  $( window ).resize(function() {
    var x = document.getElementById("myTopnav");
    var width = $(window).width();
     
    if(width>=1100)
    {
        x.style.display = "block";
    }

  });
 

$(function () {
    
    
    var slider          = $('.slider'),
        sliderUl        = slider.find('.slider-parent'),
        sliderUlLi      = sliderUl.find('.images-list'),
        sliderOl        = slider.find('.buttom-circles'),
        sliderOlLi      = sliderOl.find('.buttom-circles-list'),
        sliderFaRight   = slider.find('> .fa:first-of-type'),
        sliderFaLeft    = slider.find('> .fa:last-of-type'),
        sliderTime      = 1000,
        sliderWait      = 2000,
        sliderSetInt,
        resumeAndPause;
    
    sliderFaLeft.fadeOut();
    
 //Fontion de reglage de la largeur et la langueur
	function resetWH() {
        slider.width(slider.parent().width()).height(slider.parent().width() * 0.5);
        sliderUl.width(slider.width() * sliderUlLi.length).height(slider.height());
        sliderUlLi.width(slider.width()).height(slider.height());
    }
    resetWH();
 
	function runSlider() {
        if (sliderOlLi.hasClass('slider-active')) {
            sliderUl.animate({
                marginLeft: -slider.width() * ($('.slider-active').data('slider') - 1)
            }, sliderTime);
        }
        if ($('.slider-active').is(':first-of-type')) {
            sliderFaLeft.fadeOut();
        } else {
            sliderFaLeft.fadeIn();
        }
        if ($('.slider-active').next().is(':last-of-type')) {
            sliderFaRight.fadeOut();
        } else {
            sliderFaRight.fadeIn();
        }
    }
 
	function runRight() {
        slider.each(function () {
            $('.slider-active').next().addClass('slider-active').siblings().removeClass('slider-active');
            runSlider();
        });
    }
 
	function runLeft() {
        slider.each(function () {
            $('.slider-active').prev().addClass('slider-active').siblings().removeClass('slider-active');
            runSlider();
        });
    }
 
	sliderSetInt = function autoRunSlider() {
        if ($('.slider-active').next().is(':last-of-type')) {
            sliderUl.animate({
                marginLeft: -sliderUlLi.width() * $('.slider-active').data('slider')
            }, sliderTime, function () {
                sliderUl.css('margin-left', 0);
                sliderOlLi.first().addClass('slider-active').siblings().removeClass('slider-active');
            });
        } else {
            runRight();
        }
    };
    
    resumeAndPause = setInterval(sliderSetInt, sliderWait);
    
 
	$(window).on('resize', function () {
        resetWH();
    });
    
 
	slider.each(function () {
        sliderOlLi.click(function () {
            $(this).addClass('slider-active').siblings().removeClass('slider-active');
            runSlider();
        });
    });
    
    sliderFaRight.on('click', function () {
        runRight();
    });
    sliderFaLeft.on('click', function () {
        runLeft();
    });
    
    slider.find('.fa').hover(function () {
        clearInterval(resumeAndPause);
    }, function () {
        resumeAndPause = setInterval(sliderSetInt, sliderWait);
    });
});