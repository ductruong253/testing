var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require('./models/comment')

var data = [{
    name: "Vung Tau",
    image: "https://www.dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/01/kinh-nghiem-du-lich-vung-tau-2.jpg",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  },
  {
    name: "Nha Trang",
    image: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_728,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/nchm1263hz7zaftbelmt/V%C3%A9VinpearlLandNhaTrang.jpg",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  },
  {
    name: "Mui Ne",
    image: "https://travel.com.vn/Images/destination/tf_170116114852_579671.jpg",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  }
]



function seedDB() {
  Campground.remove({}, function(err) {
    if (err) {
      console.log("Removed campground error");
    }
    console.log("Remove campground success!");
/*    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          Comment.create({
              text: "mom oa dosa mdom sm osam doas mdos mdaa  sda dsa  mda",
              author: "James"
            }, function(err, comment) {
              if (err) {
                console.log(err)
              } else {
                campground.comments.push(comment)
                campground.save()
                console.log("created new comments")
              }
            }
          )
        }
      })
    })*/
  })
}

module.exports = seedDB
