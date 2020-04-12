var HttpStatus = require('http-status-codes');
const session = require('express-session');
var nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const multer = require('multer');
var express = require('express');
var moment = require('moment');

var router = express.Router();

router.use(session({
	secret: 'somerandonstuffs',
	resave: false,
	saveUninitialized: false,
	cookie: { expires: 6000000 }
}));

/* SET STORAGE MULTER */ 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads')
	},
	filename: function (req, file, cb) {
		var fileExtension = file.originalname.split('.');
		cb(null, `${file.fieldname}-${Date.now()}.${fileExtension[fileExtension.length - 1]}`);
	}
})
var upload = multer({ storage: storage })

/* model */ 
const Users = mongoose.model("Users")
const realestateSchema = mongoose.model("Realestate")
const automobileSchema = mongoose.model("Automobile")
const planSchema = mongoose.model("Plan")
const selectPlanSchema = mongoose.model("User_plan")
const boatsSchema = mongoose.model("Boats")
const globtechSchema = mongoose.model("Globtech")

/* register API Functionality */ 

/*
router.post("/register", upload.single('logo_upload'), async (req, res) => { 
	var email = req.body.email;
	var password = req.body.password;
	var conf_password = req.body.conf_password;
	var presentation_upload = req.body.presentation_upload;

	const images = req.file;
	
	const checkEmail = await Users.find({"email": email});
	if(checkEmail.length > 0) {
		res.json({status : false, msg : "this email already exists!"});
		return;
	}
	if(password.length < 6)
	{
		res.json({status : false, msg : "Password should be minimum 6 characters!"});
		return;
		
	}
	if(password == conf_password) {
		try {
			const post = new Users();
			post.company_name = req.body.company_name;
			post.contact_name = req.body.contact_name;
			post.zip_code = req.body.zip_code;
			post.location = req.body.location;
			post.address = req.body.address;
			post.phone = req.body.phone;
			post.email = req.body.email;
			post.role = req.body.role;
			post.password = req.body.password;
			post.logo_upload = images.filename;
			post.created_at = moment().format("ll"); 
			post.status = true;

			await post.save();
			res.json({
				status : true, 
				msg : "user registered successfully",
				data : post
			});
			return;
		}
		catch(error) {
			console.log(error);
			res.json({ error_msg: "Something went wrong" });
			return;
		}
	}
	else
	{
		res.json({status : false, msg : "Password and confirm password must be same!"});
		return;
	}
});
*/ 

//var baseUrl = "/globe-admin.herokuapp.com"

// router.get('/home',function(req,res,next) {
// 	console.log("Base url: " + req.baseUrl);        
// 	next();
// })


/* register API Functionality */ 
router.post("/registerUser",  async (req, res) => {
	if(req.body.role == undefined || req.body.role == null) {
		res.status(400).json({error_msg: "Role can not be blank"});
		return;
	}
	if(req.body.username == undefined || req.body.username == null) {
		res.status(400).json({error_msg: "username can not be blank"});
		return;
	}
	if(req.body.email==undefined || req.body.email==null) {
		res.status(400).json({error_msg:"email not found in body"});
		return;	
	}
	if(req.body.password == undefined || req.body.password == null) {
		res.status(400).json({error_msg: "password can not be blank"});
		return;
	}
	if(req.body.conf_password == undefined || req.body.conf_password == null) {
		res.status(400).json({error_msg: "conf_password can not be blank"});
		return;
	}
	var email_ = req.body.email;
	var pass = req.body.password;
	var location = req.body.location;
	var username = req.body.username;
	var conf_pass = req.body.conf_password;

	const checkUsername = await Users.find({"username": username});
	if(checkUsername.length > 0) {
		res.status(HttpStatus.CONFLICT).json({status : HttpStatus.CONFLICT, msg : "User already exists"});
		return;
	}
	const checkEmail = await Users.find({"email": email_});
	if(checkEmail.length > 0) {
		res.status(HttpStatus.CONFLICT).json({status : HttpStatus.CONFLICT, msg : "Email already exists"});
		return;
	}
	if (username.length > 3) {
        res.status(HttpStatus.LENGTH_REQUIRED).json({status : HttpStatus.LENGTH_REQUIRED, msg : "Username must be greater than 2 characters"});
		return;
	}
	if (username.length < 20) {
        res.status(HttpStatus.LENGTH_REQUIRED).json({status : HttpStatus.LENGTH_REQUIRED, msg : "Username must be less than 20 characters"});
		return;
	}
	if(email_)
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var results = re.test(email_)
		if(results == false) {
            res.status(HttpStatus.PRECONDITION_FAILED).json({status : HttpStatus.PRECONDITION_FAILED, msg : "Invalid email id"});
			return;
		}
	}
	if(pass == conf_pass) {
		try
		{
			let registerUser = new Users({
				email : email_,
				role : req.body.role, 
				phone : req.body.phone,
				address : req.body.address,
				logo_url : req.body.logo_url,
				username : req.body.username,
				password : req.body.password,
				location : req.body.location,
				zip_code : req.body.zip_code,
				device_id: req.body.device_id,
				device_type : req.body.device_type,
				company_name : req.body.company_name,
				contact_name : req.body.contact_name,
				presentation_url : req.body.presentation_url,
				created_at : moment().format("ll"),
				user_type : true,
				status : true
			});
			registerUser.save(function(error, created) {
			    console.log(error);
				if(created)
				{
					res.status(HttpStatus.CREATED).json({status : HttpStatus.CREATED, msg :"User registered successfully.", data : created});
					return;
				}
				else
				{
					res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg :"Username already exists."});
					return;
				}
			})
		}
		catch(error) {
			console.log(error);
			res.status(HttpStatus.NOT_FOUND).json({ error_msg: "Something went wrong"});
			return;
		}
	}
	else
	{
		res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : "Password and confirm password must be same!"});
		return;
	}
});

/* login API Functionality */ 
router.post("/login", async (req, res) => {
	if(req.body.email==undefined || req.body.email==null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg:"email not found in body"});
		return;	
	}
	if(req.body.password == undefined || req.body.password == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "password cannot be blank"});
		return;
	}
	
	var username = req.body.email;
	var password = req.body.password;
	var logintime = new Date().getTime();
	//const userDetails = await Users.find({ $and : [ {"email": username }, {"password": password}]});
	const userDetails = await Users.findOne({"email": username});
	if(userDetails !=null) {
		if (password == userDetails.password) {

			req.session.user_id = userDetails._id;	
			req.session.userrole = userDetails.role;
			req.session.emailId = userDetails.email;
			req.session.contactName = userDetails.contact_name;

			const user_data = await Users.update({_id : userDetails._id }, {
				$set : {login_time : logintime}
            });
            res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : " Logged in Successfully",  data : userDetails});
			return;
		}
		else
		{
			res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : " Invalid credentials!"});
			return;
		}
	}
	else
	{
		res.status( HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : " User does not exist!"});
		return;
	}
});


/* forgotPassword API Functionality */ 
router.post("/forgotPassword", async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "email cannot be blank"});
		return;
	}
	// var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// var results = re.test(email);

	var emailId = req.body.email; 
	const userEmail = await Users.find({"email": emailId});
	if(userEmail.length > 0) {
		var newpassword = generatePassword();
		//console.log('newpassword : ', newpassword)
		const updatePass = await Users.update({email : userEmail[0].email}, {$set : {password : newpassword}});
		
		var smtpTransport = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			// port: 587,
			 port: 465,  
			secure: true,
			auth: {
				user: 'shailendra.brinfotech@gmail.com',
				pass: 'shailendra@123'
			}
		});
		var mailOptions = {
			from: "GlobAvenue <globAvenue.admin@gmail.com>",
			to: userEmail[0].email,
			subject: "GlobAvenue Notification",
			html: "Hello " + userEmail[0].username + ", <br /><br />"
				+ "Please setup  your new password : &nbsp;" + "<b>" + newpassword + "</b>" + '\n\n' + "<p>Thank you,<br />GlobAvenue team.</p>"
		}
		smtpTransport.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('error', error);
				res.json({ status: false, msg: "Error in sending mail." });
				return;
			} else {
				res.json({ status: true, msg: "Thank you! An email has been sent to " + userEmail[0].email + " email id. Please check your inbox." });
				return;
			}
		});
	}
	else 
	{
		res.json({ status: false, msg: "Invalid email_id for User."});
		return;
	}
});

/* generate Password function */
generatePassword = function () {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$ABCDEFGHIJKLMNOP1234567890";
    var string_length = 8;
    var genPassword = '';
    var charCount = 0;
    var numCount = 0;
    for (var i = 0; i < string_length; i++) {
        if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
            var rnum = Math.floor(Math.random() * 10);
            genPassword += rnum;
            numCount += 1;
        } else {
            var rnum = Math.floor(Math.random() * chars.length);
            genPassword += chars.substring(rnum, rnum + 1);
            charCount += 1;
        }
	}
	return genPassword;
};

/* change Password function */
router.post("/changePassword", async (req, res) => {
	if(req.body.userId == undefined || req.body.userId == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "userId cannot be blank"});
		return;
	}
	if(req.body.password == undefined || req.body.password == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "password cannot be blank"});
		return;
    }
    
    var userId = req.body.userId
	var newpassword = req.body.password
	var conf_pass = req.body.conf_password;

	if(newpassword != conf_pass) {
		res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : "Password and confirm password must be same"});
		return;
	}
	const userdetail = await Users.findOne({"_id": userId});
	if(userdetail) {
		try 
		{
			const changPass = await Users.update({_id : userdetail._id }, {$set : {password : newpassword}});
			res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "Password Update successfully"});
			return;
		}
		catch(error){
			console.log(error)
			res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "Something went wrong"});
			return;
		}
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "user id not found."});
		return;
	}
});


/* myProfile API Functionality */ 
router.post("/myProfile", async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "email cannot be blank"});
		return;
	}
	var email = req.body.email;
	const userDetails = await Users.findOne({"email": email});
	if(userDetails!=null) {
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "user details !", data : userDetails});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "Email is Not found !"});
		return;
	}
});


/* usersList API */ 
router.get('/usersList', async (req, res) => {
	let data = await Users.find({});
	if(data!= undefined && data.length>0) {
		res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'users list', data});
	  	return;
	}
	else 
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg : 'no details found.', data});
		return;
	}
});

/* getProfile By Email_id API */ 
router.get('/getProfile/:email', async (req, res) => {
	let email = req.params.email;
	const user = await Users.findOne({"email": email});
	if(user) {
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "user details", data : user});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "user details not found !"});
		return;
	}
});

/* Update Profile Details API */  
router.post('/profileUpdate',  async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "email cannot be blank"});
		return;
	}
	var email = req.body.email;
	const result = await Users.findOne({"email": email});
	// console.log('-> Email:', result.email);
	if(result) {
	  	let post = await Users.update({email : result.email},
			{ $set : {
				phone : req.body.phone,
				location : req.body.location,
				country : req.body.country,
				language : req.body.language,
				profile_image : req.body.profile_image,
				updated_at : new Date().getTime()
			}
	  	});
          res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'details update successfully'});
	  return;
	}
	else
	{
        res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"email not found for user"});
	  return;
	}
});


/* Realestate post function  */
router.post('/realestatePost', async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "email cannot be blank"});
		return;
	}
	if(req.body.video_url == undefined || req.body.video_url == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "video_url cannot be blank"});
		return;
	}
	if(req.body.category == undefined || req.body.category == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "category cannot be blank"});
		return;
	}
	
	var email_ = req.body.email;
	if(email_)
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var results = re.test(email_)
		if(results == false) {
			res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : "invalid email"});
			return;
		}
	}
	try
	{	
		let realestateDetails = new realestateSchema({
			email : email_,
			name : req.body.name,
			type : req.body.type,
			mobile : req.body.mobile,
			user_id : req.body.user_id,
			address : req.body.address,
			category : req.body.category,
			keywords : req.body.keywords,
			video_url : req.body.video_url,
			description : req.body.description,
			address_lat : req.body.address_lat,
			address_long : req.body.address_long,
			purpose : req.body.purpose,
			location : req.body.location,
			square_feet : req.body.square_feet,
			type_of_space : req.body.type_of_space,
			no_of_bedrooms : req.body.no_of_bedrooms,
			no_of_bathrooms : req.body.no_of_bathrooms,
			garage_included : req.body.garage_included,
			time_of_avaliability : req.body.time_of_avaliability,
			residential_or_holiday : req.body.residential_or_holiday,
			lift : req.body.lift,
			price : req.body.price,
			level : req.body.level,
			currency : req.body.currency,
			condition : req.body.condition,
			amenities : req.body.amenities,
			rent_price : req.body.rent_price,
			monthly_charges : req.body.monthly_charges,
			status : true,
			payment_status : false,
			created_at : moment().format("ll")
		})
		realestateDetails.save(function(error, created){
			if(error)
			{
				console.log('error :', error );
				res.status(HttpStatus.EXPECTATION_FAILED).json({status : HttpStatus.EXPECTATION_FAILED, msg : "Realestate not post"});
                return;
            }
			else
			{
				res.status(HttpStatus.CREATED).json({status : HttpStatus.CREATED, msg :"Realestate posted successfully.", data : created});
				return;
			}
		})
	}
	catch(error) {
		console.log(error);
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "Something went wrong"});
		return;
	}
});

/* getProfile By Email_id API */ 
router.get('/getRealestate/:email', async (req, res) => {
	let email = req.params.email;
	const realestate = await realestateSchema.find({"email": email});
	if(realestate) {
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "Realestate details", data : realestate});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "Realestate details not found"});
		return;
	}
});


/* Update Realestate Details function */ 
router.post('/updateRealestate', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "postId cannot be blank" });
		return;
	}
	let result = await realestateSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let post = await realestateSchema.update({_id : req.body.postId},
		{
			$set : 
			{
				type : req.body.type,
				lift : req.body.lift,
				level : req.body.level,
				price : req.body.price,
				email : req.body.email,
				mobile : req.body.mobile,
				address : req.body.address,
				purpose : req.body.purpose,
				location : req.body.location, 
				keywords : req.body.keywords, 
				currency : req.body.currency,
				video_url : req.body.video_url,
				condition : req.body.condition,
				amenities : req.body.amenities,
				rent_price : req.body.rent_price, 
				updated_at : new Date().getTime(),
				description : req.body.description,
				square_feet : req.body.square_feet,
				type_of_space : req.body.type_of_space,
				no_of_bedrooms : req.body.no_of_bedrooms,
				no_of_bathrooms : req.body.no_of_bathrooms,
				garage_included : req.body.garage_included,
				monthly_charges : req.body.monthly_charges,
				time_of_avaliability : req.body.time_of_avaliability,
				residential_or_holiday : req.body.residential_or_holiday
			}
		})
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : 'Details update successfully'});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg:"Record not found"});
    	return;
	}
});

/* Get All  Realestate  API */
router.get('/getAllRealestate', async (req, res) => {
	//var admin_details = await Admin.find({ $and : [ {"email": username }, {"password": password}]}, {"_id":1, "username":1, "email":1, "role":1})
	let result = await realestateSchema.find({"payment_status": false});
	if( result!= undefined && result.length>0 )
	{
        res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : 'Realestate details', data : result});
	  return;
	}
	res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : 'Record not found.'});
	return;
});

/* Delete realeState Details API */
router.post('/deleteRealestate', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "invalid access"});
		return;
	}
	const result = await realestateSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let realestate = await realestateSchema.findByIdAndRemove({_id: req.body.postId}, function(err, success) {
			if(err) {
			  console.log(err);
			  res.status(HttpStatus.NOT_FOUND).json({ err: err });
			}
			else
			{
                res.status(HttpStatus.OK).json({ status: HttpStatus.OK, msg : 'Deleted successfully'});
			  return;
			}
		})
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: false, msg:"Record not found"});
		return;
	}
});


/* getRealestateById */
router.post("/getRealestateById", async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "postId cannot be blank"});
		return;
	}
	var _id = req.body.postId;
	const result = await realestateSchema.findOne({"_id": _id});
	if(result!=null)
	{
        res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'Realestate details', data : result});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
		return;
	}
});

/* -----------------------------------------Start Automobile API ----------------------------------- */

/* Automobile post API  */

router.post('/automobilePost', async (req, res) => {
	if(req.body.category == undefined || req.body.category == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "category cannot be blank"});
		return;
	}
	if(req.body.user_id == undefined || req.body.user_id == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "user_id cannot be blank"});
		return;
	}
	var email_ = req.body.email;
	if(email_)
	{
		var emailval = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var results = emailval.test(email_)
		if(results == false) {
			res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : "invalid email"});
			return;
		}
	}
    try
	{
		let postData = new automobileSchema({
			email : email_,
			name : req.body.name,
			type : req.body.type,
			mobile : req.body.mobile,
			user_id : req.body.user_id,
			address : req.body.address,
			category : req.body.category,
			keywords : req.body.keywords,
			description : req.body.description,
			base64_video : req.body.base64_video,
			display_contact : req.body.display_contact,
			fuel : req.body.fuel,
			make : req.body.make,
			model : req.body.model,
			seller : req.body.seller,
			engine : req.body.engine,
			variant : req.body.variant,
			mileage : req.body.mileage,
			gear_type : req.body.gear_type,
			condition : req.body.condition,
			horse_power : req.body.horse_power,
			emission_class : req.body.emission_class,
			registration_year : req.body.registration_year,
			doors : req.body.doors,
			seats : req.body.seats,
			price : req.body.price,
			color : req.body.color,
			warranty : req.body.warranty,
			location : req.body.location,
			currency : req.body.currency,
			accessories : req.body.accessories,
			interior_seats : req.body.interior_seats,
			equipment_description : req.body.equipment_description,
			status : true,
			payment_status : false,
			created_at : moment().format("ll")
		})
		postData.save(function(error, created)
		{
			if(error)
			{
				console.log('error :', error );
				res.status(HttpStatus.EXPECTATION_FAILED).json({status : HttpStatus.EXPECTATION_FAILED, msg :"Automobile not post"});
				return;
			}
			else
			{
				res.status(HttpStatus.CREATED).json({status : HttpStatus.CREATED, msg :"Automobile posted successfully.", data : created});
				return;
			}
		})
	}
	catch(error)
	{
		console.log(error);
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "Something went wrong"});
		return;
	}
});

/* Get All  Automobile  API */
router.get('/getAutomobile', async (req, res) => {
	let result = await automobileSchema.find({});
	if( result!= undefined && result.length>0 )
	{
        res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'automobile details', data : result});
	  return;
	}
	res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg : 'no details found.'});
	return;
});

/* getAutomobileById API */ 
router.get('/getAutomobileById/:postId', async (req, res) => {
	let _id = req.params.postId;
	const result = await automobileSchema.find({"_id": _id});
	if(result!= undefined && result.length>0) {
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "Automobile detail", data : result});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "Details not found"});
		return;
	}
});

router.post('/getAutomobileByEmail', async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "email cannot be blank" });
		return;
	}
	var email = req.body.email;
	console.log('email :', email);
	let result = await automobileSchema.find({"email" : email});
	if(result.length>0)
	{
		res.status(HttpStatus.OK).json({status_code : HttpStatus.OK, msg : "Automobile detail", data : result});
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status_code : HttpStatus.NOT_FOUND, msg : "Details not found "});
		return;
	}
});

/* updateAutomobile API */ 
router.post('/updateAutomobileDetails', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "postId cannot be blank" });
		return;
	}
	let result = await automobileSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let post = await automobileSchema.update({_id : req.body.postId}, {
			$set : {
				fuel : req.body.fuel,
				make : req.body.make,
				type : req.body.type,
				email : req.body.email,
				model : req.body.model,
				seats : req.body.seats,
				color : req.body.color,
				doors : req.body.doors,
				price : req.body.price,
				mobile : req.body.mobile,
				engine : req.body.engine,
				seller : req.body.seller,
				variant : req.body.variant,
				warranty : req.body.warranty,
				address : req.body.address,
				mileage : req.body.mileage,
				keywords : req.body.keywords,
				location : req.body.location,
				currency : req.body.currency,
				condition : req.body.condition,
				gear_type : req.body.gear_type,
				updated_at : new Date().getTime(),
				description : req.body.description,
				accessories : req.body.accessories,
				horse_power : req.body.horse_power, 
				base64_video : req.body.base64_video,
				interior_seats : req.body.interior_seats,
				emission_class : req.body.emission_class,
				display_contact : req.body.display_contact,
				registration_year : req.body.registration_year,
				equipment_description : req.body.equipment_description,

			}
		})
		res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'Details update successfully'});
		return; 
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
    	return;
	}
});

/* Delete realeState Details API */
router.post('/deleteAutomobile', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "invalid access"});
		return;
	}
	const result = await automobileSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let realestate = await automobileSchema.findByIdAndRemove({_id: req.body.postId}, function(err, success) {
			if(err)
			{
			  console.log(err);
			  res.status(HttpStatus.NOT_FOUND).json({ err: err });
			}
			else
			{
                res.status(HttpStatus.OK).json({ status: HttpStatus.OK, msg : 'Deleted successfully'});
			    return;
			}
		})
	}
	else
	{
        res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
		return;
	}
});
/* ------------------------------------End Automobile API ------------------------------- */

/* Get All Plan API */
router.get('/getAllPlan', async (req, res) => {
	let result = await planSchema.find({"status": true});
	if(result != null)
	{
		res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'plan details', plan : result});
	  	return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg : 'no plan details found'});
		return;
	}
});

router.post('/selectPlan', async (req, res) => {
	if(req.body.user_id == undefined || req.body.user_id == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "user_id cannot be blank" });
		return;
	}
	if(req.body.subscription_id == undefined || req.body.subscription_id == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "subscription_id cannot be blank" });
		return;
	}
	if(req.body.subscription_name == undefined || req.body.subscription_name == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "subscription_name cannot be blank" });
		return;
	}
	if(req.body.subscription_price == undefined || req.body.subscription_price == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "subscription_price cannot be blank" });
		return;
	}
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "email cannot be blank" });
		return;
	}
	if(req.body.contact_name == undefined || req.body.contact_name == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "contact_name cannot be blank" });
		return;
	}
	try
	{
		let postData = new selectPlanSchema({
			user_id : req.body.user_id,
			subscription_id : req.body.subscription_id,
			subscription_name : req.body.subscription_name,
			subscription_Validity : req.body.subscription_Validity,
			subscription_price : req.body.subscription_price,
			subscription_details : req.body.subscription_details,
			email : req.body.email,
			contact_name : req.body.contact_name,
			status : true,
			payment_status : true,
			created_at : moment().format("ll")
		})
		postData.save(function(error, created)
		{
			if(error)
			{
				console.log('error :', error );
				res.status(HttpStatus.EXPECTATION_FAILED).json({status : HttpStatus.EXPECTATION_FAILED, msg :"transaction failed"});
				return;
			}
			else
			{
				res.status(HttpStatus.CREATED).json({status : HttpStatus.CREATED, msg :"transaction successful", data : created});
				return;
			}
		})

	}
	catch(error)
	{
		console.log(error);
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "Something went wrong"});
		return;
	}
});
/* ------------------------------------End Plan API ------------------------------- */

/* -----------------------------------Start Boats API ----------------------------------- */
/* Boats post API  */
router.post('/boatsPost', async (req, res) => {
	if(req.body.category == undefined || req.body.category == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "category cannot be blank"});
		return;
	}
	if(req.body.user_id == undefined || req.body.user_id == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "user_id cannot be blank"});
		return;
	}
	var email_ = req.body.email;
	if(email_)
	{
		var emailval = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var results = emailval.test(email_)
		if(results == false) {
			res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : "invalid email"});
			return;
		}
	}
	try
	{
		let postData = new boatsSchema({
			email : email_,
			name : req.body.name,
			type : req.body.type,
			mobile : req.body.mobile,
			user_id : req.body.user_id,
			address : req.body.address,
			category : req.body.category,
			keywords : req.body.keywords,
			description : req.body.description,
			base64_video : req.body.base64_video,
			display_contact : req.body.display_contact,
			fuel : req.body.fuel,
			make : req.body.make,
			model : req.body.model,
			price : req.body.price,
			location : req.body.location,
			currency : req.body.currency,
			year : req.body.year,
			length : req.body.length,
			width : req.body.width,
			depth : req.body.depth,
			vat_payed : req.body.vat_payed,
			for : req.body.for,
			boat_type : req.body.boat_type,
			power : req.body.power,
			fuel : req.body.fuel,
			water_capacity : req.body.water_capacity,
			no_of_bedrooms : req.body.no_of_bedrooms,
			no_of_bathrooms : req.body.no_of_bathrooms,
			engine_hours : req.body.engine_hours,
			engine_type : req.body.engine_type,
			color_hull: req.body.color_hull,
			no_of_engines: req.body.no_of_engines,
			hull_material: req.body.hull_material,
			status : true,
			payment_status : false,
			created_at : moment().format("ll")
		})
		postData.save(function(error, created)
		{
			if(error)
			{
				console.log('error :', error );
				res.status(HttpStatus.EXPECTATION_FAILED).json({status : HttpStatus.EXPECTATION_FAILED, msg :"boats not post"});
				return;
			}
			else
			{
				res.status(HttpStatus.CREATED).json({status : HttpStatus.CREATED, msg :"boats posted successfully.", data : created});
				return;
			}
		})
	}
	catch(error)
	{
		console.log(error);
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "Something went wrong"});
		return;
	}
})

/* Get All  Boats  API */
router.get('/getBoats', async (req, res) => {
	let result = await boatsSchema.find({"status": true});
	if( result!= undefined && result.length>0 )
	{
        res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'boats list', data : result});
	  return;
	}
	res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg : 'no list found.'});
	return;
});

/* update Boates Details API */ 
router.post('/updateBoatesDetails', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "postId cannot be blank" });
		return;
	}
	let result = await boatsSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let post = await boatsSchema.update({_id : req.body.postId}, {
			$set : {
				fuel : req.body.fuel,
				make : req.body.make,
				type : req.body.type,
				name : req.body.name,
				email : req.body.email,
				model : req.body.model,
				price : req.body.price,
				mobile : req.body.mobile,
				address : req.body.address,
				keywords : req.body.keywords,
				location : req.body.location,
				currency : req.body.currency,
				year : req.body.year,
				length : req.body.length,
				width: req.body.width,
				depth : req.body.depth,
				vat_payed : req.body.vat_payed,
				for : req.body.for,
				boat_type: req.body.boat_type,
				power : req.body.power,
				fuel: req.body.fuel,
				engine_type : req.body.engine_type,
				engine_hours : req.body.engine_hours,
				base64_video : req.body.base64_video,
				water_capacity: req.body.water_capacity,
				no_of_bedrooms : req.body.no_of_bedrooms,
				no_of_bathrooms: req.body.no_of_bathrooms,
				display_contact : req.body.display_contact,
				color_hull: req.body.color_hull,
				no_of_engines: req.body.no_of_engines,
				hull_material: req.body.hull_material,
				description : req.body.description,
				updated_at : new Date().getTime()
			}
		})
		res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'Details update successfully'});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
    	return;
	}
});

/* getBoatsById API */ 
router.get('/getBoatsById/:postId', async (req, res) => {
	let _id = req.params.postId;
	const result = await boatsSchema.find({"_id": _id});
	if(result!= undefined && result.length>0) {
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "boats detail", data : result});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "Details not found"});
		return;
	}
});


/* get boatsByEmail API */
router.post('/getBoatsByEmail', async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "email cannot be blank" });
		return;
	}
	var email = req.body.email;
	console.log('email :', email);
	let result = await boatsSchema.find({"email" : email});
	if(result.length>0)
	{
		res.status(HttpStatus.OK).json({status_code : HttpStatus.OK, msg : "Boats detail", data : result});
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status_code : HttpStatus.NOT_FOUND, msg : "Details not found "});
		return;
	}
});

/* Delete realeState Details API */
router.post('/deleteboats', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "invalid access"});
		return;
	}
	const result = await boatsSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let boats = await boatsSchema.findByIdAndRemove({_id: req.body.postId}, function(err, success) {
			if(err)
			{
			  console.log(err);
			  res.status(HttpStatus.NOT_FOUND).json({ err: err });
			}
			else
			{
                res.status(HttpStatus.OK).json({ status: HttpStatus.OK, msg : 'Deleted successfully'});
			    return;
			}
		})
	}
	else
	{
        res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
		return;
	}
});
/* --------------------------------- End Boats API ---------------------------------------- */

/* ----------------------------------- Start GlobeTech API --------------------------------- */
/* globtech post API  */
router.post('/globtechPost', async (req, res) => {
	if(req.body.category == undefined || req.body.category == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "category cannot be blank"});
		return;
	}
	if(req.body.user_id == undefined || req.body.user_id == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "user_id cannot be blank"});
		return;
	}
	var email_ = req.body.email;
	if(email_)
	{
		var emailval = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var results = emailval.test(email_)
		if(results == false) {
			res.status(HttpStatus.FORBIDDEN).json({status : HttpStatus.FORBIDDEN, msg : "invalid email"});
			return;
		}
	}
	try
	{
		let postData = new globtechSchema({
			email : email_,
			name : req.body.name,
			mobile : req.body.mobile,
			user_id : req.body.user_id,
			address : req.body.address,
			category : req.body.category,
			keywords : req.body.keywords,
			description : req.body.description,
			base64_video : req.body.base64_video,
			display_contact : req.body.display_contact,
			make : req.body.make,
			price : req.body.price,
			location : req.body.location,
			status : true,
			payment_status : false,
			created_at : moment().format("ll")
		})
		postData.save(function(error, created)
		{
			if(error)
			{
				console.log('error :', error );
				res.status(HttpStatus.EXPECTATION_FAILED).json({status : HttpStatus.EXPECTATION_FAILED, msg :"globtech not post"});
				return;
			}
			else
			{
				res.status(HttpStatus.CREATED).json({status : HttpStatus.CREATED, msg :"globtech posted successfully.", data : created});
				return;
			}
		})
	}
	catch(error)
	{
		console.log(error);
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "Something went wrong"});
		return;
	}
});

/* Get All  Boats  API */
router.get('/getGlobtechList', async (req, res) => {
	let result = await globtechSchema.find({"status": true});
	if( result!= undefined && result.length>0)
	{
    	res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'globtech list', data : result});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg : 'no list found.'});
		return;
	}
});

/* getGlobtechById API */ 
router.get('/getGlobtechById/:postId', async (req, res) => {
	let _id = req.params.postId;
	const result = await globtechSchema.findOne({"_id": _id});
	if(result!= null) {
		res.status(HttpStatus.OK).json({status : HttpStatus.OK, msg : "Globetech detail", data : result});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status : HttpStatus.NOT_FOUND, msg : "Details not found"});
		return;
	}
});

/* get GlobtechByEmail API */
router.post('/getGlobtechByEmail', async (req, res) => {
	if(req.body.email == undefined || req.body.email == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "email cannot be blank" });
		return;
	}
	var email = req.body.email;
	let result = await globtechSchema.find({"email" : email});
	if(result.length>0)
	{
		res.status(HttpStatus.OK).json({status_code : HttpStatus.OK, msg : "Globtech detail", data : result});
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status_code : HttpStatus.NOT_FOUND, msg : "Details not found "});
		return;
	}
});

/* update Globtec Details API */ 
router.post('/updateGlobtecDetails', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({ error_msg: "postId cannot be blank" });
		return;
	}
	let result = await globtechSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let post = await globtechSchema.update({_id : req.body.postId}, {
			$set : {
				make : req.body.make,
				type : req.body.type,
				name : req.body.name,
				email : req.body.email,
				price : req.body.price,
				mobile : req.body.mobile,
				address : req.body.address,
				keywords : req.body.keywords,
				location : req.body.location,
				updated_at : new Date().getTime(),
				description : req.body.description,
				base64_video : req.body.base64_video,
				display_contact : req.body.display_contact
			}
		})
		res.status(HttpStatus.OK).json({status: HttpStatus.OK, msg : 'Details update successfully'});
		return;
	}
	else
	{
		res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
    	return;
	}
});

/* Delete Globtech Details API */
router.post('/deleteGlobtech', async (req, res) => {
	if(req.body.postId == undefined || req.body.postId == null) {
		res.status(HttpStatus.NOT_FOUND).json({error_msg: "invalid access"});
		return;
	}
	const result = await globtechSchema.findOne({_id : req.body.postId});
	if(result)
	{
		let boats = await globtechSchema.findByIdAndRemove({_id: req.body.postId}, function(err, success) {
			if(err)
			{
			  console.log(err);
			  res.status(HttpStatus.NOT_FOUND).json({ err: err });
			}
			else
			{
                res.status(HttpStatus.OK).json({ status: HttpStatus.OK, msg : 'Deleted successfully'});
			    return;
			}
		})
	}
	else
	{
        res.status(HttpStatus.NOT_FOUND).json({status: HttpStatus.NOT_FOUND, msg:"Record not found"});
		return;
	}
});
/* ------------------------------- End GlobeTech API ----------------------------------- */



module.exports = router;