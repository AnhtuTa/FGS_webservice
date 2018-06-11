var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var HotelDAO = require('./HotelDAO');
var ProvinceDAO = require('./ProvinceDAO');
var DistrictDAO = require('./DistrictDAO');
var PostDAO = require("./PostDAO");
var UserDAO = require("./UserDAO");
var ObjectDAO = require("./ObjectDAO");
var ReviewDAO = require("./ReviewDAO");
var ReturnMessage = require("./ReturnMessage");

hotelDAO = new HotelDAO();
provinceDAO = new ProvinceDAO();
districtDAO = new DistrictDAO();
postDAO = new PostDAO();
userDAO = new UserDAO();
objectDAO = new ObjectDAO();
reviewDAO = new ReviewDAO();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Hotel {
        id: Int!
        hotel_id: Int
        name: String
        star: Int
        avatar: String
        hotel_url: String
        image_urls: String
        street: String
        district: String
        city: String
        latitude: String
        longitude: String
        review_point: Float
        num_reviews: Int
        area: Float
        price: Int
    }
    type Post {
        id: Int!
        user_id: Int
        name: String
        description: String
        avatar: String
        image_urls: String
        street: String
        district: String
        city: String
        area: Float
        price: Int
        time: String
        contact_name: String
        contact_phone: String
        contact_email: String
        contact_address: String
    }
    type User {
        id: Int!
        username: String
        email: String
        fullname: String
        encrypted_password: String
        enabled: Int
    }
    type Review {
        id: Int!
        user_id: Int
        user_name: String
        hotel_id: Int
        review_point: Int
        comment: String
        time: String
    }
    input HotelInput {
        hotel_id: Int
        name: String
        star: Int
        avatar: String
        hotel_url: String
        image_urls: String
        street: String
        district: String
        city: String
        latitude: String
        longitude: String
        review_point: Float
        num_reviews: Int
        area: Float
        price: Int
    }
    input PostInput {
        user_id: Int
        name: String
        description: String
        avatar: String
        image_urls: String
        street: String
        district: String
        city: String
        area: Float
        price: Int
        time: String
        contact_name: String
        contact_phone: String
        contact_email: String
        contact_address: String
    }
    input UserInput {
        username: String!
        email: String!
        fullname: String
        encrypted_password: String!
        enabled: Int
    }
    input ReviewInput {
        user_id: Int!
        hotel_id: Int!
        review_point: Int!
        comment: String!
    }
    type ReturnMessage {
        status: String!
        error: String
    }
    type Province {
        id: Int!
        name: String
    }
    type District {
        id: Int
        province_id: Int
        name: String
        prefix: String
    }
    type Query {
        hotel(id: Int!): Hotel
        hotels(start:Int!, nums: Int!, search_by: String!, input: String!, where: String, order_by: String) : [Hotel]
        post(id: Int!): Post
        posts(start:Int!, nums: Int!, search_by: String!, input: String!, where: String, order_by: String) : [Post]
        postsToApprove: [Post]
        countPostsToApprove: Int
        allProvinces: [Province]
        province(id: Int!): Province
        district(id: Int!): District
        districts(province_id: Int!): [District]
        user(username: String!, encrypted_password: String!): User
        userByUsername(username: String!): User
        review(hotel_id: Int!, user_id: Int!): Review
        reviews(hotel_id: Int!, start: Int!, nums: Int!): [Review]
    }
    type Mutation {
        # insertHotel(input: HotelInput!): ReturnMessage  #Chú ý: input là tham số chứ ko phải keyword
        # updateHotel(id: ID!, input: HotelInput): ReturnMessage
        # deleteHotel(id: ID!): ReturnMessage
        insertPost(input: PostInput!): ReturnMessage
        insertUser(input: UserInput!): ReturnMessage
        insertReview(input: ReviewInput!): ReturnMessage
        updateReview(hotel_id: Int!, user_id: Int!, review_point: Int, comment: String): ReturnMessage
        deleteReview(hotel_id: Int!, user_id: Int!): ReturnMessage
    }
`);

var root = {
    hotel: function({id}) {
        var result = objectDAO.getObject("hotel", id);
        return result;
    },
    hotels: function({start, nums, search_by, input, where, order_by}) {
        //var result = connection.query('SELECT * FROM hotel');
        var result = hotelDAO.getHotels(start, nums, search_by, input, where, order_by);
        return result;
    },
    post: function({id}) {
        var result = objectDAO.getObject("post", id);
        return result;
    },
    posts: function({start, nums, search_by, input, where, order_by}) {
        var result = postDAO.getPosts(start, nums, search_by, input, where, order_by);
        return result;
    },
    postsToApprove: function() {
        return postDAO.getPostsToApprove();
    },
    countPostsToApprove: function() {
        return postDAO.countPostsToApprove();
    },
    allProvinces: function() {
        return provinceDAO.getAllProvinces();
    },
    province: function({id}) {
        return provinceDAO.getProvince(id);
    },
    district: function({id}) {
        return districtDAO.getDistrict(id);
    },
    districts: function({province_id}) {
        return districtDAO.getDistricts(province_id);
    },
    user: function({username, encrypted_password}) {
        return userDAO.getUserByUsernameAndPass(username, encrypted_password);
    },
    userByUsername: function({username}) {
        return userDAO.getUserByUsername(username);
    },
    review: function({hotel_id, user_id}) {
        return reviewDAO.getReview(hotel_id, user_id);
    },
    reviews: function({hotel_id, start, nums}) {
        return reviewDAO.getAllReviews(hotel_id, start, nums);
    },

    insertHotel: function({input}) {
        //return hotelDAO.insertHotel(input);
        return objectDAO.insertObject("hotel", input);
    },
    updateHotel: function({id, input}) {
        return hotelDAO.updateHotel(id, input);
    },
    deleteHotel: function({id}) {
        return hotelDAO.deleteHotel(id);
    },
    insertPost: function({input}) {
        return objectDAO.insertObject("post", input);
    },
    insertUser: function({input}) {
        return objectDAO.insertObject("user", input);
    },
    insertReview: function({input}) {
        return objectDAO.insertObject("review", input);
    },
    updateReview: function({hotel_id, user_id, review_point, comment}) {
        var input = {
            "review_point": review_point,
            "comment": comment
        }
        return reviewDAO.updateReview(hotel_id, user_id, input);
    },
    deleteReview: function({hotel_id, user_id}) {
        return reviewDAO.deleteReview(hotel_id, user_id);
    },  
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));
app.listen(process.env.PORT || 3000);
console.log('Running a GraphQL API server at localhost:3000/graphql');

/*
query {
  hotels(start: 0, nums: 20, search_by: "district", input: "Hoàn kiếm", where: "price <= 1000000 AND (star = 3 OR star = 4)", order_by: "price DESC") {
    id
    name
    street
    district
    city
    star
    price
  }
}

query {
	posts(start: 0, nums: 100, search_by: "city", input: "ha noi") {
    id
    user_id
  }
}

*/