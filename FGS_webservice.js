var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var HotelDAO = require('./HotelDAO');
var ProvinceDAO = require('./ProvinceDAO');
var DistrictDAO = require('./DistrictDAO');
var ReturnMessage = require("./ReturnMessage");

hotelDAO = new HotelDAO();
provinceDAO = new ProvinceDAO();
districtDAO = new DistrictDAO();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    # type Hotel phải có các field giống hệt các field trong database và trong code Java
    type Hotel {
        id: Int!
        hotel_id: Int
        name: String
        star: Int
        hotel_avatar: String
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
    input HotelInput {
        hotel_id: Int
        name: String
        star: Int
        hotel_avatar: String
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
        hotels(start:Int!, nums: Int) : [Hotel]
        hotel(id: Int!): Hotel
        provinces: [Province]
        province(id: Int!): Province
        districts(province_id: Int!): [District]
    }
    type Mutation {
        insertHotel(input: HotelInput!): ReturnMessage  #Chú ý: input là tham số chứ ko phải keyword
        updateHotel(id: ID!, input: HotelInput): ReturnMessage
        deleteHotel(id: ID!): ReturnMessage
    }
`);

var root = {
    hotels: function({start, nums}) {
        //var result = connection.query('SELECT * FROM hotel');
        var result = hotelDAO.getAllHotels(start, nums);
        return result;
    },
    hotel: function({id}) {
        var result = hotelDAO.getHotel(id);
        return result;
    },
    insertHotel: function({input}) {
        return hotelDAO.insertHotel(input);
    },
    updateHotel: function({id, input}) {
        return hotelDAO.updateHotel(id, input);
    },
    deleteHotel: function({id}) {
        return hotelDAO.deleteHotel(id);
    },
    provinces: function() {
        return provinceDAO.getAllProvinces();
    },
    province: function({id}) {
        return provinceDAO.getProvince(id);
    },
    districts: function({province_id}) {
        return districtDAO.getDistricts(province_id);
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));
app.listen(process.env.PORT || 3000);
//console.log('Running a GraphQL API server at localhost:3000/graphql');
