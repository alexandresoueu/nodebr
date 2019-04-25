docker ps 
docker exec -it bec4062f5978 /
  mongo -u admin -p senhaadmin --authenticationDatabase heroes

  show dbs // show databases
  use heroes // change the context to a database
  show collections // show collections
  
  //READ
  db.heroes.find() // show database content
  db.heroes.find().pretty() // show database content formated
  db.heroes.count()
  db.heroes.findOne()
  db.heroes.find().limit(5).sort({ names: -1})
  db.heroes.find({}, {power: 1, _id: 0})

  //CREATE
  db.heroes.insert({
    names: 'Buchecha',
    power: 'Fofura',
    birthdate: '1992-10-17'
  })

  for(let i=0; i <= 10; i++) {
    db.heroes.insert({
      names: `Buchecha${i}`,
      power: 'Fofura',
      birthdate: '1992-10-17'
    })
  }

  //UPDATE
  db.heroes.update({_id: ObjectId("5ca1383e5da115e3478dafc2")}, {names: 'Zé da Jujuba'}) // Update Data but delete other datas

  db.heroes.update({_id: ObjectId("5ca1394b5da115e3478dafc3")}, { $set:{ names: 'Zé da Jujuba' } }) // Update only data set

  db.heroes.update({_id: ObjectId("5ca1394b5da115e3478dafc4")}, { $set:{ naminho: 'Zé da Muamba' } }) // create new data in collection

  //DELETE
  db.heroes.remove({}) // Remove all datas
  db.heroes.remove({ _id: bjectId("5ca1394b5da115e3478dafcd")} ) // Remove only data set