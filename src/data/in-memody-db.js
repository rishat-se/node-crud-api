
class UsersDB {
    #users = [];

    readAll() {
        return [...this.#users];
    }

    readById(id) {
        return { ...this.#users.find((item) => item.id === id) };
    }

    create(user) {
        this.#users.push(user);
    }

    update(user) {
        const index = this.#users.findIndex((item) => item.id === user.id);
        if (index < 0) throw new Error('User not found');
        this.#users[index] = { ...user };
    }

    delete(id) {
        const index = this.#users.findIndex((item) => item.id === id);
        if (index < 0) throw new Error('User not found');
        this.#users = this.#users.filter((item) => item.id !== id);
    }

}

export const users = new UsersDB();