
interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

class UsersDB {
    private users: User[] = [];

    readAll() {
        return [...this.users];
    }

    readById(id: string): User {
        const user = this.users.find((item) => item.id === id);
        if (!user) throw new Error('user not found');
        return { ...user };
    }

    create(user: User) {
        this.users.push(user);
    }

    update(user: User) {
        const index = this.users.findIndex((item) => item.id === user.id);
        if (index < 0) throw new Error('user not found');
        this.users[index] = { ...user };
    }

    delete(id: string) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index < 0) throw new Error('user not found');
        this.users = this.users.filter((item) => item.id !== id);
    }

}

export const users = new UsersDB();