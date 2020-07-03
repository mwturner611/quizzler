const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/quizzler"
  );

  const userSeed = [
      {
          email:'Bugs.Bunny@gmail.com',
          password: 'password',
          decks: [
            {
                name:'Capitols',
                descr:'Learn the state capitals',
                 cards: [
                    {
                      keyWord:"Tennessee",
                      definition:"Nashville"
                    },
                    {
                      keyWord:"Mississippi",
                      definition:"Jackson"
                    },
                    {
                      keyWord:"Alabama",
                      definition:"Montgomery"
                    },
                    {
                      keyWord:"Alaska",
                      definition:"Juneau"
                    },
                    {
                      keyWord:"Arizona",
                      definition:"Phoenix"
                    }
                 ]
                },
                {
                  name:'Heros',
                  descr:'Identify a heros real name from their alterego',
                  cards: [
                    {
                      keyWord:"Hawkeye",
                      definition:"Clint Barton"
                    },
                    {
                      keyWord:"Green Lantern",
                      definition:"Hal Jordan"
                    },
                    {
                      keyWord:"Black Panter",
                      definition:"King T'Challa"
                    },
                    {
                      keyWord:"Captain America",
                      definition:"Steve Rogers"
                    },
                    {
                      keyWord:"The Flash",
                      definition:"Barry Allen"
                    },
                    {
                      keyWord:"Daredevil",
                      definition:"Matt Murdock"
                    },
                    {
                      keyWord:"Iron Man",
                      definition:"Tony Stark"
                    }

                  ]
                }  
          ]
      },
      {
          email:'Daffy.Duck@gmail.com',
          password: 'password',
          decks:[
             {
            name:'Periodic Table',
            descr:'From the symbol name the element',
             cards: [
                {
                  keyWord:"H",
                  definition:"Hydrogen"
                },
                {
                  keyWord:"He",
                  definition:"Helium"
                },
                {
                  keyWord:"Li",
                  definition:"Lithium"
                },
                {
                  keyWord:"Be",
                  definition:"Beryllium"
                },
                {
                  keyWord:"B",
                  definition:"Boron"
                }
              ]
            },
            {
              name:'Mongoose JS',
              descr:'From the keyword come up with the definition of a Mongoose element',
               cards: [
                  {
                    keyWord:"Collections",
                    definition:"Collections' in Mongo are equivalent to tables in relational databses. They can hold multiple JSON documents"
                  },
                  {
                    keyWord:"Documents",
                    definition:"Documents are equivalent to records or rows of data in SQL. While a SQL row can reference data in other tables, Mongo documents usually combine that in a document"
                  },
                  {
                    keyWord:"Fields",
                    definition:"Fields or attributes are similar to columns in a SQL table."
                  },
                  {
                    keyWord:"Schema",
                    definition:"While Mongo is schema-less, SQL defines a schema via the table definition.  A mongoose schema is a document data structure (or shape of the document) that is enforced via the application layer."
                  },
                  {
                    keyWord:"Models",
                    definition:"Models are higher-order constructors that hake a schema and create an instance of a document equivalent to records in a relational databse."
                  }
                ]
              },
          
          ]
      }
]

  db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });