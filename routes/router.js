const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const session = require("express-session");
const bcrypt = require("bcrypt")
const saltRounds=10;

const multer = require('multer');



router.use(
  session({
      key:"Login User",
      secret:"test ex",
      resave: false,
      saveUninitialized:false,
      cookie:{
          expires:60*24*24*24,

      },
  })
);
const connection = mysql.createConnection({
  host: 'react200.c3wogmzr4dyl.us-east-1.rds.amazonaws.com',
  user : 'admin',
  port : '3306',
  password : 'dudwns7201Q!',
  database : 'react',
  multipleStatements: true,
  });

  router.post("/join", (req, res) => {
    const user_id = req.body.username;
    const user_pw = req.body.password;
    const user_pw2 = req.body.password2;
    const user_phone = req.body.phone;
    const user_consumername = req.body.consumername;
    
    const invalid = user_id.length>=1&&user_pw.length>=1&&user_phone.length>=1&&user_consumername.length>=1;

    
    /*connection.query("SELECT * FROM member WHERE user_id = ?;",
    user_id,
    (err,result)=>{
      if(result)
      { 
        console.log("ID가 중복됩니다");
       
        return false;
      }

    } 
    )*/

    if(user_pw !== user_pw2){
     
      res.send({message : "비밀번호 확인 해주세요"});
      
      /*if(user_pw === user_pw2){
        console.log("비밀번호일치");
        res.send({message : "비밀번호 일치"});
      }*/
      return false;
    }
    
    
    bcrypt.hash(user_pw,saltRounds,(err,hash) =>{
      if(err) {
        console.log(err);
      }

      if(!invalid){
        res.send({msg : "모든 값을 입력해주세요"});
      }
      else if(invalid)
      { 
        res.send({true : "true"});
      connection.query("INSERT INTO member (user_id,user_pw,user_name,user_phone) values(?,?,?,?)",
      [user_id,hash,user_consumername,user_phone]),  
      function(err,result){
        console.log(err);
        console.log(result);
    };
      
       
      }
     

    })

  });

  

  router.post('/',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    connection.query(
      "SELECT * FROM member WHERE user_id = ?;",
      username,

      function(err,result){
        if(err){
         res.send({err:err});
        }

        if(result.length > 0){
          bcrypt.compare(password,result[0].user_pw,
          function(error, response){                  
            if(response){   
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            }
            else{  
              res.send({message : "ID/PW wrong"});        
            }
          })
        }
          else {
          res.send({message:"user not exist"});        
        }
      }
    );



  });
  
  
  router.get('/',function(req,res,next){
    
    if(req.session.user ){
      res.send({LoggedIn:true, user : req.session.user});
      
    }
    else{
      res.send({LoggedIn:false})
    }
  });

  router.get('/main',function(req,res,next){
    console.log(req.session.user);
    if(req.session.user ){
      res.send({LoggedIn:true, user : req.session.user});
      
    }
    else{
      res.send({LoggedIn:false})
    }
  });
  router.get('/question',function(req,res,next){
    console.log(req.session.user);
    if(req.session.user ){
      res.send({LoggedIn:true, user : req.session.user});
      
    }
    else{
      res.send({LoggedIn:false})
    }
  });
  router.get('/write',function(req,res,next){
    console.log(req.session.user);
    if(req.session.user ){
      res.send({LoggedIn:true, user : req.session.user});
      
    }
    else{
      res.send({LoggedIn:false})
    }
  });
 
  router.post('/question',(req,res)=>{
    connection.query("SELECT * FROM Writing",
    function(err,rows,fields){
      if(err){
        console.log("실패");
      }
      else{
        console.log("select 값 ");
       
        res.send(rows);
      }
    }

    )
  });
  router.post('/write',(req,res)=>
  {
    const title = req.body.Sendtitle;
    const board = req.body.Sendboard;
    const showdate = new Date();
    const month = showdate.getMonth() + 1;
    const today = showdate.getFullYear()+'-'+month+'-'+showdate.getDate()+'-'+showdate.getHours()+":"+showdate.getMinutes();
    console.log(month);
    connection.query("INSERT INTO Writing(title,author,board,date)values(?,?,?,?)",
    [title,req.session.user[0].user_id,board,today],
    function(err,rows,fields){
    
      if(err){
        console.log("실패");
      }
      else
      { res.send(rows);
        console.log("insert 성공 ");
      }
    });

  })
  router.get('/Read',(req,res)=>{
    
    if(req.session.user){
      res.send({LoggedIn: true,user:req.session.user})
    }
    else{
      res.send({LoggedIn:Flas})
    }

  });
  
  router.post('/Read',(req,res)=>{
    const title = req.body.Sendtitle;
    console.log(title);

     //connection.query(`SELECT * FROM Writing Where writing_no=${title} AND SELECT * FROM comment where writing_no=${title} `,
     // SELECT * FROM Writing LEFT JOIN comment ON (Writing.Writing_no = comment.writing_no) LEFT JOIN member ON (comment.user_no = member.user_no) where Writing.writing_no=68
    connection.query(`SELECT * FROM Writing LEFT JOIN comment ON (Writing.Writing_no = comment.writing_no) LEFT JOIN member ON (comment.user_no = member.user_no) where Writing.writing_no=${title}`,
    function(err,rows,fields){
      if(err){
        console.log("실패");
        
      }
      else{
        console.log(rows);
        res.send(rows);
        
      }
    }
    )
  })

  router.post('/mycomment', (req,res)=>
  {
    const {userNum, comment, writingNum, commentNum} = req.body;
    let nextNum = '';

    console.log(comment)

    const query1 = "Select comment_no FROM comment where writing_no=(?)";
    const query2 = "INSERT INTO comment(user_no, comment, writing_no, comment_no)values(?,?,?,?)";
  
    const sql1 = connection.format(query1, writingNum);
    const sql2 = connection.format(query2, userNum, comment, writingNum, nextNum);

    console.log(nextNum);
    connection.query(sql1, (err, rows, fields) => {
      nextNum = `${writingNum}_${rows.length}`;
      console.log(nextNum)
      connection.query(query2,
        [userNum, comment, writingNum, nextNum],
        function(err,rows,fields){
          let test = rows;
          console.log(test);
        //(`${writingNum}_${rows.length}`)
  
  
      console.log(rows);
        if(err){
          console.log("실패");
        }
        else
        { res.send(rows);
          console.log("insert 성공 ");
        }
      });

    })


  })

  // 댓글 조회
  router.get('/salecomment/:saletitle', (req, res) => {
    const saletitle = req.params;
    const sql = ` SELECT * FROM Sale_comment LEFT JOIN sale on Sale_comment.salenum = sale.salenum WHERE Sale_comment.salenum = ${saletitle.saletitle}`;

    connection.query(sql, (err, rows, fields) => {
        if(err){
          console.log("sale comment Error");
        } 
        else {
          console.log("clear");
          res.send(rows);
        }
    });
  });

  // 댓글 생성
  router.post('/salecomment', (req,res)=>
  {
    const {userNum, comment, saleNum, commentNum} = req.body;
    console.log("111111" + saleNum);

    const sql = `INSERT INTO Sale_comment(salecomment_no, user_no, comment, salenum) VALUE (?,?,?,?); `;

    connection.query(sql, 
      [commentNum, userNum, comment, saleNum],
      (err, rows, fields) => {
      if(err){
        console.log(err);
      } 
      else {
        console.log("clear");
        res.send(rows);
      }
  });



  })

  router.post('/saleup',(req,res)=>
  {
    const {userNum, comment, saleNum, commentNum} = req.body;

    console.log(commentNum)

    connection.query("UPDATE Sale_comment SET comment=(?) WHERE salecomment_no=(?) AND saleNum=(?)",
    [ comment, commentNum, saleNum],
    function(err,rows,fields){
    console.log(rows);
      if(err){
        console.log("실패");
      }
      else
      { res.send(rows);
        console.log("update 성공 ");
      }
    });

  })

  router.post('/saledel',(req,res)=>
  {
    const {userNum, comment, saleNum, commentNum} = req.body;

    console.log(comment)

    connection.query("UPDATE Sale_comment SET comment=(?) WHERE user_no=(?) AND (salenum=(?) AND salecomment_no=(?) )",
    [ comment, userNum, saleNum, commentNum],
    function(err,rows,fields){
    console.log(rows);
      if(err){
        console.log("실패");
      }
      else
      { res.send(rows);
        console.log("delete 성공 ");
      }
    });

  })


  router.post('/myup',(req,res)=>
  {
    const {userNum, comment, writingNum, commentNum} = req.body;

    console.log(commentNum)

    connection.query("UPDATE comment SET comment=(?) WHERE user_no=(?) AND (writing_no=(?) AND comment_no=(?) )",
    [ comment, userNum, writingNum, commentNum],
    function(err,rows,fields){
    console.log(rows);
      if(err){
        console.log("실패");
      }
      else
      { res.send(rows);
        console.log("update 성공 ");
      }
    });

  })
  
  router.post('/mydel',(req,res)=>
  {
    const {userNum, comment, writingNum, commentNum} = req.body;

    console.log(comment)

    connection.query("UPDATE comment SET comment=(?) WHERE user_no=(?) AND (writing_no=(?) AND comment_no=(?) )",
    [ comment, userNum, writingNum, commentNum],
    function(err,rows,fields){
    console.log(rows);
      if(err){
        console.log("실패");
      }
      else
      { res.send(rows);
        console.log("delete 성공 ");
      }
    });

  })


  router.get('/saleinfo',(req,res)=>{
    
    if(req.session.user){
      res.send({LoggedIn: true,user:req.session.user})
    }
    else{
      res.send({LoggedIn:Flas})
    }

  });

  router.post('/saleinfo',(req,res)=>{
    const saletitle = req.body.Sendsaletitle;
    console.log(saletitle);

    connection.query("SELECT * FROM sale Where salenum="+saletitle,
    //connection.query("SELECT * FROM sale JOIN Sale_comment ON (sale.salenum = Sale_comment.salenum) LEFT JOIN member ON (Sale_comment.user_no = member.user_no) where salenum="+saletitle,
    function(err,rows,fields){
      if(err){
        console.log("실패");
        
      }
      else if(rows[0]){
        res.send(rows[0]);
        console.log(rows[0]);
        
       
      }
    }
    )
  })



  const storage = multer.diskStorage({
    destination: (req,file, cb)=>{
      
      cb(null,'./zip')
    },
    filename:  (req,file, cb)=>{
    
    cb(null, `${Date.now()}${file.originalname}`)
    }
  
  })
  const upload = multer({storage: storage,
    limits: { fileSize: 1000000000 }}
    
    )




    router.post('/Salereg',upload.single("file"),(req,res)=>
    {
      console.log(req.session);
      const id = req.session.user[0].user_id;
      const title = req.body.saletitle;
      const textarea = req.body.saletextarea;
      const price = req.body.saleprice;
      const state = req.body.salestate;
      const image = '/zip/'+req.file.filename;
      const showdate = new Date();
      const today = showdate.getFullYear()+'-'+(showdate.getMonth()+1)+'-'+showdate.getDate()+'-'+showdate.getHours()+
      ":"+showdate.getMinutes();

      
      connection.query("INSERT INTO sale(saletitle,saletextarea,saleprice,salestate,image,regDt,user_id)values(?,?,?,?,?,?,?)",
      [title,textarea,price,state,image,today,id],
      function(err,rows,fields){
      console.log(rows);
        if(err){
          console.log(err);
          console.log("실패");
        }
        else
        { res.send(rows);
          console.log("insert 성공 ");
         
        }
      });
  
    })
    router.post('/sale',(req,res)=>{
      connection.query("SELECT * FROM sale",
      function(err,rows){
        if(err){

        }
        else
        {
          res.send(rows);
        }
      }
      )

    })

    router.post('/search', (req,res)=>{
      const {title} = req.body;
      const target = title.trim();
      // console.log(target)
      connection.query(`SELECT * FROM sale WHERE saletitle LIKE '%${target}%'`,
      [target],
      function(err,rows){
        if(err){
          console.log(err)
        }
        else
        {
          console.log(rows)
          res.send(rows);
        }
      }
      )
      

    })
    router.post('/search-writing', (req,res)=>{
      const {title} = req.body;
      const target = title.trim();
        connection.query(`SELECT * FROM Writing WHERE title LIKE '%${target}%'`,
      function(err,rows){
        if(err){
          console.log(err)
        }
        else
        {
          res.send(rows);
        }
      }
      )
      

    })
    router.get('/search',function(req,res,next){
    
      if(req.session.user ){
        res.send({LoggedIn:true, user : req.session.user});
        
      }
      else{
        res.send({LoggedIn:false})
      }
    });

    router.post('/my',(req,res)=>{
      // connection.query("SELECT * FROM member INNER JOIN sale on (member.user_id=sale.user_id)",
      console.log(req);
      
      connection.query("SELECT * FROM member LEFT JOIN sale on member.user_id=sale.user_id UNION LIGHT JOIN sale on member.user_id=sale.user_id",
      function(err,rows,fields){
        console.log("adad");
        if(err){
          console.log("실패");
        }
        else{
        
        console.log("select 값 ");
        console.log(rows);
        res.send(rows);
        }
      }
      )
      }


    )


    router.get('/my',function(req,res,next){
     console.log('my 시작부분 ');
    //  if(req.session.user ){
    //   res.send({LoggedIn:true, user : req.session.user});
      
    // }
    // else{
    //   res.send({LoggedIn:false})
    // }
    const user = req.session.user[0].user_id;
    console.log("user:"+user);
    
    if (user){
    console.log("DB");
     connection.query("SELECT * FROM member LEFT JOIN sale on member.user_id=sale.user_id ",
     
      function(err,rows){
       
        
         for(var i = 0; i <rows.length;i++)
         {
            
        
         if(user === rows[i].user_id){
         console.log("adad");
       if(err){
           console.log("실패");
         console.log(err);
         }
         else{
        
        res.send(rows[i]);
         break;
        }
       }

      }
    }



      )
    }
      




    });

    const server = require("http").createServer(router);
const io = require("socket.io")(server);

//한국 시간으로 설정하기
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

let i = 0;
let user = [];

let prevDate = moment().year() + "년 " + (moment().month()+1) + "월 " + moment().date() + "일";
// let date1 = new Date();
// let prevDate = date1.getFullYear() + "년 " + (date1.getMonth()+1) + "월 " + date1.getDate() + "일"; 


io.on("connection", socket => {
    console.log("Client Successfully Connected");
    
    let connectionDt = moment().year() + "년 " + (moment().month()+1) + "월 " + moment().date() + "일";
    // let date2 = new Date();
    // let connectionDt = date2.getFullYear() + "년 " + (date2.getMonth()+1) + "월 " + date2.getDate() + "일";

    let userInfo = {}, dateInfo = {};
    userInfo.socketId = socket.id;
    userInfo.userId = '/' + (++i);
    userInfo.sysmsg = 'entrance';
    userInfo.date = connectionDt;  
    user.push(userInfo);

    if(prevDate !== userInfo.date){
        dateInfo = {date:userInfo.date, time:'N', sysmsg:'todayDate'}
        socket.broadcast.emit("chat",dateInfo)
    } 

    io.sockets.emit("sysmsg", userInfo); //user정보 보내기
    prevDate = userInfo.date;

    socket.on('Chat', msg => { // msgEmit에서 메세지 받기
        var output = (msg.time !== 'N' ? {msg : msg.message, date:msg.date, time:msg.time, id : userInfo.userId}:msg)
        //var output = {msg : msg.message, date:msg.date, time:msg.time, id : userInfo.userId};
        //나를 제외하고 메세지 전송하기
        let date2 = new Date();
        socket.broadcast.emit("Chat", output)
        prevDate = msg.date;
        //나를 포함해서 메세지 전송하기
        //io.sockets.emit("chat", output); 
    });
 
    socket.on('disconnect', () => {
        let disconnectDt = moment().year() + "년 " + (moment().month()+1) + "월 " + moment().date() + "일";
        // let date3 = new Date();
        // let disconnectDt = date3.getFullYear() + "년 " + (date3.getMonth()+1) + "월 " + date3.getDate() + "일";
        userInfo.sysmsg = 'out';
        userInfo.date = disconnectDt;

        if(prevDate !== userInfo.date){
            dateInfo = {date:userInfo.date, time:'N', sysmsg:'todayDate'}
            io.sockets.emit("Chat",dateInfo)
        }

        user.push(userInfo);

        io.sockets.emit("sysmsg", userInfo);
        prevDate = userInfo.date;

    })

});
    router.get('/chat',(req,res)=>{
      console.log(req);


    })
    //   router.get('/Salereg',(req,res)=>{
  //    console.log(req.session.user); 
  //     res.send("as");
  //   console.log("adada");

  // });

  module.exports =router;