const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService{
    constructor(){
        this.users =[];
        this.generate();
    }

    generate() {
        const limit= 50;
        for(let index =0; index <limit; index ++){
            this.users.push({
                id:faker.datatype.uuid(),
                name:faker.commerce.userName(),
                image:faker.image.imageUrl(),
            });
        }
    }

    async create(data) {
        const newUser={
            id: faker.datatype.uuid(),
            ...data
        }
        this.users.push(newUser);
        return newUser;
    }
    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.users);
            }, 3000);
        })
    }

    async findOne(id){
        const user= this.users.find(item => item.id === id);
        if(!user){
            throw boom.notfound('Usario no encontrado');
        }
        return user;
    }

    async update(id, changes){
        const index = this.users.findIndex(item => item.id === id);
        if(index === -1){
              throw boom.notfound('usuario no encontrado');
        }

        const user = this.users[index];
        this.users[index]={
          ...user,
          ...cahnges
        };
        return this.users[index];
    }

    async delete_(id){
      const index = this.users.findIndex(item =>item.id ===id);
      if (index === -1){
        throw boom.notFound('user nor found');
      }
      this.users.splice(index, 1);
      return { id };
    }
}
 modele.exports = UsersService;
