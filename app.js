require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'DaPeoDGvY2AAAAAAAABXU1-91y5iCVQyduRNf340Nd-RqxNoC7Gt-I0V1zjLzpJ4' });
var FormData = require('form-data');
var graph = require('fbgraph');
var Blob = require('blob');
const https = require('https');
const querystring = require('querystring');  
var isAlphanumeric = require('is-alphanumeric');
var conf = {
  client_id: '174457976455341',
  client_secret: '628c9cb6724decae7c04deaf5e1343f5',
  access_token: 'EAACEdEose0cBADigybdsLTt50j5MF3GGuNh98RUChcZAZAbCbyZAFuy7mG6zXjuk1vbrwzr0gcyY29DvPYZCI82vLycIHEYZCw42GqZB6CynGUdGM0gAjvpIQ4hLs1VORKJfx2aGCXF419YbF8WJ2YJr9Oi2v2Uc9at7AeTB0F8LnmHNq9bCZAHZCxyx0KAoKiMZD',
  user_id: '209454969647232',
  _id: '100017481910340',
  extended_access_token: 'EAACeqym3AK0BAOVcETqz2ocPfQLvJIXYVWvFoaPvsK9xDv4TwPyrRsDcKDcyCfDGiZB1fjIAqd0Y9ZChZAzIrz8DrZBY9GTZCmF6FmOYCP1FFyh7aZBmjj7Lg3Jnf9ZByidZAzQWhi19f8fZAKOw6ZA3CUZAYcDkf640qVJfZAq6OeSnugZDZD',
  test_page_id: '134713127328575',
  peter_specific_token: 'EAACEdEose0cBABHWMaBHpe14daaV9vZCPeMAkiz2uSlF9isNsmeZBxDUZBnmlYqLcHe5BykDffbpXa6UpGuwDavF6mkRDzt59WQGNqg3jU6UR5QfCOlE6As3YTZA6YLyiC0qw0ZAPKTvcBckRyoId8oH3KqSdwjpf7fHSwokLEqsPg8HuuNALALPZCYtkmpL4ZD',
  test_page_access_token: 'EAACeqym3AK0BALYMN9W09AZAjKOofrsEf1GOxx0OUHE4fLLqZA5sv6p8mFi4R106S9q6qBLd6KjD1d0SF8ZCFEkiZC55Qfz2vVDjIoZBDZBZBfrtovvefEeYstma3pUdBiNl9eryMHM1OIVFnZCXL34gZB5pMNudyTmkIlxdGaCzsXgZDZD'
}
const fs = require('fs');
const fbUpload = require('facebook-api-video-upload');
var args = {
  token: 'EAACeqym3AK0BAIc63KIsx0EEYRZAd8rYlp62zCvoraAaqnjZBcg2bP483uI3wgMOREd2kkMQFYiPE6cz666YhQxHvZBTi5Ijy2Yz9brOrvfFoXppTs7LG4AuHLcEisoqxmNbNe1E1Pvzcb8sMAXINbNaRzQTimkiFZCZAWHv0jtWjZAjYZBZCv37C4ChcNUTA8hN6ZBJjpVB7rAZDZD', // with the permission to upload
  // token: conf.extended_access_token,
  id: '134713127328575', //The id represent {page_id || user_id || event_id || group_id}
  // id: '209454969647232', //The id represent {page_id || user_id || event_id || group_id}
  stream: fs.createReadStream('/home/star/Downloads/small.mp4'), //path to the video,
  title: "my video2",
  description: "my description2"
};
const dfs = require('dropbox-fs')({
  apiKey: 'DaPeoDGvY2AAAAAAAABXU1-91y5iCVQyduRNf340Nd-RqxNoC7Gt-I0V1zjLzpJ4'
});

function makeHttpRequest(api, form_data) {
  return new Promise(function(resolve, reject){
    form_data.append('token', 'fe4f039cbdcb5d3e65192efd7ac2c3e57e06741bc712b32655cca3bb1392b70a');    
    fetch(api, {method: 'POST', body: form_data}).then(function(res) {
      return res.json();
    }).then(res=>{
      resolve(res);
    }).catch(function(err) {
      reject(err);
    })
  });

}
getListingForThreeHours();
function getListingForThreeHours() {
  let form_data = new FormData();
  form_data.append('from_date', '2015-04-01');
  form_data.append('to_date', '2018-05-01');
  makeHttpRequest('http://updashboardtest.site/updashboard/up_listing_api.php', form_data)
  .then(function(list){
    for (var i = 0; i < list.length; i++) {
      // if (!list[i].flyer_upload && list[i].pdf_url) {
      //   uploadFlyerPdf(list[i]);
      //   break;
      // }
      if (!list[i].video_upload && list[i].video_url) {
        uploadVideo(list[i]);
        break;
      }
    }
  })
  .catch(function(err){
    console.log(err);
  })
}
function uploadFlyerPdf(flyer_data) {
  let form_data = new FormData();
  form_data.append('crm_id', flyer_data['crm_id']);
  form_data.append('customer_command', 'R');
  makeHttpRequest('http://updashboardtest.site/updashboard/up_customer_api_update.php', form_data)
  .then(function(user){
    if (user['auto_posting'] == 'Y'){
      var customer_name = flyer_data['display_name'];
      var crm_id = flyer_data['crm_id'];
      var addr = flyer_data['address'];
      var urls = flyer_data['pdf_url'].split('/');
      var file_name = flyer_data['pdf_url']. split('/')[urls.length - 1].replace('?dl=0', '');
      // var pdf_path = '/updashboard-uploads/' + customer_name + '-' + crm_id + '/' + 'Listing' + '_' + addr + '/' + file_name; 
      var pdf_path = '/updashboard-uploads/' + customer_name + '-' + crm_id + '/' + 'Listing' + '_' + standardizePath(addr) + '/' + file_name; 
      uploadFlyerPdfWithPath(pdf_path, flyer_data).then(function(){
        updateUploadedStateForFlyer(flyer_data);
      }).catch(function(err){
        console.log(err);
      })
    }
  })
  .catch(function(err){
    console.log(err);
  })  
}
function uploadVideo(video_data) {
  let form_data = new FormData();
  form_data.append('crm_id', video_data['crm_id']);
  form_data.append('customer_command', 'R');
  makeHttpRequest('http://updashboardtest.site/updashboard/up_customer_api_update.php', form_data)
  .then(function(user){
    if (user['auto_posting'] == 'Y'){
      var customer_name = video_data['display_name'];
      var crm_id = video_data['crm_id'];
      var addr = video_data['address'];
      var urls = video_data['video_url'].split('/');
      var file_name = video_data['pdf_url']. split('/')[urls.length - 1].replace('?dl=0', '');
      // var file_name = 'LV_AntoineMAyoub_5842FlorenceAve.mp4';
      var pdf_path = '/updashboard-uploads/' + customer_name + '-' + crm_id + '/' + 'Listing' + '_' + standardizePath(addr) + '/' + file_name; 
      uploadVideoWithPath(pdf_path, video_data).then(function(res){
        updateUploadedStateForVideo(video_data);
      }).catch(function(err){
        console.log(err);
      })
    }
  })
  .catch(function(err){
    console.log(err);
  })   
}
function updateUploadedStateForFlyer(flyer_data) {
  return new Promise(function(resolve, reject){
    let form_data = new FormData();
    form_data.append('listing_id', flyer_data['listing_id']);
    form_data.append('listing_command', 'W');
    form_data.append('flyer_upload', 'uploaded');
    makeHttpRequest('http://updashboardtest.site/updashboard/up_listing_api_update.php', form_data)
    .then(function(res){
      resolve(res);
    }).catch(function(err){
      reject(err);
    })      
  })
}
function updateUploadedStateForVideo(video_data) {
  return new Promise(function(resolve, reject){
    let form_data = new FormData();
    form_data.append('listing_id', video_data['listing_id']);
    form_data.append('listing_command', 'W');
    form_data.append('video_upload', 'uploaded');
    makeHttpRequest('http://updashboardtest.site/updashboard/up_listing_api_update.php', form_data)
    .then(function(res){
      resolve(res);
    }).catch(function(err){
      reject(err);
    })      
  })
}
function standardizePath(path) {
  var result = ''
  for (var i = 0; i < path.length; i++) {
    if (!isAlphanumeric(path[i])) {
      result += '_';
    }
    else {
      result += path[i];
    }
  }
  return result;
}
function uploadFlyerPdfWithPath(pdf_path_on_dropbox, customer_data) {
  return new Promise(function(resolve, reject){
    dbx.filesDownload({path: pdf_path_on_dropbox})
    .then(function(res) {
      var random_index = Math.round(Math.random() * 100000).toString();
      var pdf_path = './pdf' + random_index + '.pdf';
      var image_path = './pdf' + random_index + "-0.png";
      fs.writeFile(pdf_path, res.fileBinary, 'binary', function(err,res) {
        if (!err) {
          uploadPdfToFacebook(pdf_path, customer_data)
          .then(function() {
            fs.unlink(pdf_path, (err) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log('removed pdf file named ' + pdf_path + ' successfully');
              }
            });
            fs.unlink(image_path, (err) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log('removed image file named ' + image_path + ' successfully');                
              }
            });
            resolve();
          })
        }
        else {
          reject(err);
        }
      });
    }).catch(function(err) {
      fs.appendFile('./pdf_path_err.txt', 'id:'+ customer_data.listing_id + ",crm_id:"+customer_data.crm_id+",display_name:"+customer_data.display_name + "\n", function(err){
        if (err) {
          console.log(err);
        }
      })    
      reject(err);
    })    
  })
  // var download = require('download-pdf')
  // var pdf = "http://www.pdf995.com/samples/pdf.pdf"
  // var options = {
  //     directory: "./",
  //     filename: "file1.pdf"
  // }
  // download(pdf, options, function(err){
  //     if (err) throw err
  //     console.log("meow");
  // });
  // var file = fs.createWriteStream("file.pdf");
  // var request = https.get("https://www.dropbox.com/s/06ady8539d9mppy/214393676.pdf?dl=1", function(response) {
  //   response.pipe(file).on('close', function() {
  //     console.log('end');
  //   });
  //   response.on('end', function () {
  //     file.end();
  //     console.log('end');
  //   });
  // })
  // dbx.filesDownload({path: pdf_path_on_dropbox.replace('?dl=0', '')})  
}
function uploadVideoWithPath(pdf_path_on_dropbox, customer_data) {
  return new Promise(function(resolve, reject){
    getPageInfoFromApi(customer_data)
    .then(function(page_info){
      if (page_info) {
        graph.get(conf.user_id + "/accounts?access_token=" + conf.extended_access_token, function(err, res) {
          args = {
            token: page_info.access_token, // with the permission to upload
            id: page_info.id, //The id represent {page_id || user_id || event_id || group_id}
            stream: dfs.createReadStream(pdf_path_on_dropbox), //path to the video,
            title: "my video",
            description: "my description"
          };  
          fbUpload(args).then((res) => {
            resolve(res);
          }).catch((e) => {
            reject(e);
          });  
        })          
      }
      else {
        reject(new Error('no page exists'));
      }
    }).catch(function(err){
      reject(err);
    })  
  })
}
function uploadPdfToFacebook(pdf_path, customer_data) {
  return new Promise(function(resolve, reject) {
    var PDFImage = require("pdf-image").PDFImage;  
    var pdfImage = new PDFImage(pdf_path);
    pdfImage.convertPage(0).then(function (imagePath) {
      const formData = new FormData();
      formData.append('message', '');
      formData.append('caption', '');
      formData.append('source', fs.createReadStream(imagePath));
      getPageInfoFromApi(customer_data)
      .then(function(page_info) {
        if (page_info) {
          fetch(`https://graph.facebook.com/${page_info.id}/photos?access_token=${page_info.access_token}`, {
            body: formData,
            method: 'post'
          }).then(function(res) {
            resolve(res);
          }).catch(function(err) {
            reject(err);
          })  
        }
        else {
          reject(err);
        }
      })
      .catch(function(err){
        reject(err);
      })
    });  
  })
}
function getPageInfoFromApi(customer_data){
  return new Promise(function(resolve, reject){
    graph.get(conf.user_id + "/accounts?limit=100000&access_token=" + conf.extended_access_token, function(err, res) {
      var pages = res.data;      
      if (customer_data['fb_page_id']) {
        for ( var i=0; i < pages.length; i++) {
          if (pages[i].id == customer_data['fb_page_id']){
            return resolve(pages[i]);
          }
        }
        return resolve({});
      }
      else {
        for ( var i=0; i < pages.length; i++) {
          if (pages[i].name.indexOf(customer_data['display_name']) > -1 || customer_data['display_name'].indexOf(pages[i].name) > -1) {
            let form_data = new FormData();
            form_data.append('crm_id', customer_data['crm_id']);
            form_data.append('customer_command', 'W');
            form_data.append('fb_page_id', pages[i].id)
            makeHttpRequest('http://updashboardtest.site/updashboard/up_customer_api_update.php', form_data);
            return resolve(pages[i]);
          }
        }
        return resolve({});
      }
    })  
  })
}
var cron = require('node-cron');
// var task = cron.schedule('* * */3 * * *', function(){
//   console.log('abcde');
//   // getListingForThreeHours();
// });
// var FB = require('fb');
// FB.setAccessToken(conf.extended_access_token);
// var PDFImage = require("pdf-image").PDFImage;
 
// var pdfImage = new PDFImage("/home/star/Pictures/sample_pdf.pdf");
// pdfImage.convertPage(0).then(function (imagePath) {
//   // 0-th page (first page) of the slide.pdf is available as slide-0.png
//     var form = new FormData();
//     const formData = new FormData();
//     // formData.append('access_token', conf.extended_access_token);
//     formData.append('message', 'some status message');
//     formData.append('caption', 'this is for the create source file');
//     formData.append('source', fs.createReadStream(imagePath));

//     // FB.api(conf.user_id + '/photos', 'post', formData, function (res) {
//     //   if(!res || res.error) {
//     //     console.log(!res ? 'error occurred' : res.error);
//     //     return;
//     //   }
//     //   console.log('Post Id: ' + res.post_id);
//     // });
//     graph.get(conf.user_id + "/accounts?access_token=" + conf.extended_access_token, function(err, res) {
//       fetch(`https://graph.facebook.com/${res.data[0].id}/photos?access_token=${res.data[0].access_token}`, {
//         body: formData,
//         method: 'post'
//       }).then(function(res) {
//         console.log(res);
//       }).catch(function(err) {
//         console.log(err);
//       })
//     });
// });

// fs.readFile('/home/star/Pictures/download.jpeg', function(err, data) {
//   const photoData = new Buffer([data], {type: 'image/jpg'});

// })  

  // graph.post(`https://graph.facebook.com/${conf.user_id}/photos`, formData, function(err, res) {
  //   console.log(res);    
  // })
// })

// graph.get(conf.user_id + "/accounts?access_token=" + conf.extended_access_token, function(err, res) {
//   args = {
//     token: res.data[0].access_token, // with the permission to upload
//     // token: conf.extended_access_token,
//     id: res.data[0].id, //The id represent {page_id || user_id || event_id || group_id}
//     // id: '209454969647232', //The id represent {page_id || user_id || event_id || group_id}
//     stream: dfs.createReadStream('/updashboard-uploads/holly thompson-adrc-192736211/listing_26068_twain_place/small.mp4'), //path to the video,
//     title: "my video3",
//     description: "my description3"
//   };  
//   fbUpload(args).then((res) => {
//     console.log('res: ', res);
//     //res:  { success: true, video_id: '1838312909759132' }
//   }).catch((e) => {
//     console.error(e);
//   });  
// })

// graph.post('134713127328575' + "/feed?access_token=" + conf.extended_access_token, {message: "helloall"}, function(err, res) {
//   // returns the post id
//   console.log(res); // { id: xxxxx}
// });

// dfs.readFile('/updashboard-uploads/holly thompson-adrc-192736211/listing_26068_twain_place/small.mp4', {encoding: 'utf8'}, (err, result) => {
//   console.log(result); // Array of files and folders

// });
// const content = fs.readFileSync('/updashboard-uploads/holly thompson-adrc-192736211/listing_26068_twain_place/small.mp4');
// dfs.writeFile('/home/star/Downloads/small1.mp4', content, {encoding: 'utf8'}, (err, stat) => {
//     console.log(stat.name); // doc.md
// });


// dbx.filesListFolder({path: '/updashboard-uploads/holly thompson-adrc-192736211/listing_26068_twain_place'})
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
// dbx.filesDownload({path: '/updashboard-uploads/holly thompson-adrc-192736211/listing_26068_twain_place/small.mp4'})
// .then(function(response) {
//   console.log(response.fileBinary);
//   var form = new FormData();
//   form.append('files',response.fileBinary)
//   form.append('title','new title')
//   form.append('description', 'new video');
//   graph.get(conf.user_id + "/accounts?access_token=" + conf.extended_access_token, function(err, res) {
//     graph.post(res.data[0].id + "/videos?access_token=" + conf.extended_access_token, {source: response}, function(err, res) {
//       // returns the post id
//       console.log(res); // { id: xxxxx}
//     });  
//   })
// })
// .catch(function(err) {
//   console.log(err);
// })


// graph.extendAccessToken({
//   "access_token":    conf.access_token,
//   "client_id":      conf.client_id,
//   "client_secret":  conf.client_secret
// }, function (err, facebookRes) {
//   conf.extended_access_token = facebookRes.access_token;
//   // graph.get(conf.user_id + "/accounts?access_token=" + conf.extended_access_token, function(err, res) {
//   //   console.log(res);  
//   // });
//     // pass it in as part of the url
  //   graph.post('134713127328575' + "/feed?access_token=" + 'EAACEdEose0cBAMQRZCXl6MiwvqLGRtvL4oiK48IpCZAl1fpWZAm650LapeRwzDMG5H4qS439XUxr9PcyNpCoFU2Jm0qqSTVZA0BZBW8TLk3MfqO8Jji4Rj7BcJsTjmZCiaountJFkzyHp4swARvMR9uBuGhas2GpBHtB4tqn8DeM4ACEJbhFDGNlJbgX6KZCMmk9pCJQp8WPgZDZD', {message: "helloall"}, function(err, res) {
  //     // returns the post id
  //     console.log(res); // { id: xxxxx}
  // });
 
// });

      
  // });

// getListingForThreeHours();
// uploadFlyerPdf('https://www.dropbox.com/s/59luexfora90e0i/211539575.pdf?dl=0');
// uploadFlyerPdf('/updashboard-uploads/Nina_Erbst-ADRC-191443133/Listing/17038_Cholla_Ave/225145341.pdf');
// standardizePath("abc cae-UNIP-195646340/listing/1 7th Street, Suite 1302");
  // graph.get(conf.user_id + "/accounts?access_token=" + conf.extended_access_token, function(err, res) {
//   args = {
//     token: res.data[0].access_token, // with the permission to upload
//     // token: conf.extended_access_token,
//     id: res.data[0].id, //The id represent {page_id || user_id || event_id || group_id}
//     // id: '209454969647232', //The id represent {page_id || user_id || event_id || group_id}
//     stream: dfs.createReadStream('/updashboard-uploads/holly thompson-adrc-192736211/listing_26068_twain_place/small.mp4'), //path to the video,
//     title: "my video3",
//     description: "my description3"
//   };  
//   graph.get(res.data[0].id + "?fields=id,name,email&access_token=" + res.data[0].access_token, function(err, res) {
//     console.log(res);
//   })
// })
//------------------------------------dropbox pdf download----------------------------------
// function downloadPdf() {
//   var file = fs.createWriteStream("/home/star/Downloads/file.pdf");
//   var url ="https://www.dropbox.com/s/06ady8539d9mppy/214393676.pdf";
  
//   https.get(url, function(res) {
//     var chunks = [];
//     res.on('data', function(chunk) {
//       console.log('start');
//       chunks.push(chunk);
//     });
  
//     res.on("end", function() {
//       console.log('downloaded');
//       var pdf_path = '/home/star/Pictures/sample_pdf2.pdf';
//       fs.writeFile(pdf_path, chunks, 'binary', function(err,res) {
//         if (!err) {
//           uploadPdfToFacebook(pdf_path)
//         }
//       });
//     });
//   }).on("error", function() {
//     console.log("error");
//   });   
// }
