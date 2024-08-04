class Generate {
    generateString(): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var string = '';
        
        for (var i = 0; i <= 5; ++i) {
            string += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return string;
    }
}

export const generate = new Generate(); 