
// category 1 means style
// category 2 means Biography


export const ABOUT_DATA = [
    {
        id: 1,
        name: "Choy Lee Fat",
        title: "陳享及蔡李佛拳簡介",
        category: 1,
        description: `Choy Lee Fat (蔡李佛) is one of the most effective and complete martial arts systems. 
        It combines the agile footwork of Northern Chinese martial arts with the powerful hand techniques of 
        Southern Chinese martial arts. Known for its wide range of techniques including strikes, kicks, sweeps, 
        and grappling, Choy Lee Fat is both a practical self-defense system and an excellent form of exercise.`,
        parent_id: null //it means no parent
    },
    {
        id: 2,
        name: "History",
        title: "蔡李佛",
        category: 1,
        description: `Chen's Tai Chi (陳氏太極拳) is the oldest and original form of Tai Chi Chuan. 
        Characterized by its distinctive silk-reeling movements, explosive power, and low stances, Chen style 
        combines slow, flowing movements with sudden bursts of speed and power. It is an excellent practice for 
        health, meditation, and martial application.`,
        parent_id: 1
    },
    {
        id: 3,
        name: "Form",
        title: "蔡李佛",
        category: 1,
        description: `Chen's Tai Chi (陳氏太極拳) is the oldest and original form of Tai Chi Chuan. 
        Characterized by its distinctive silk-reeling movements, explosive power, and low stances, Chen style 
        combines slow, flowing movements with sudden bursts of speed and power. It is an excellent practice for 
        health, meditation, and martial application.`,
        parent_id: 1
    },
    {
        id: 4,
        name: "Tai Chi",
        title: "蔡李佛",
        category: 1,
        description: `Chen's Tai Chi (陳氏太極拳) is the oldest and original form of Tai Chi Chuan. 
        Characterized by its distinctive silk-reeling movements, explosive power, and low stances, Chen style 
        combines slow, flowing movements with sudden bursts of speed and power. It is an excellent practice for 
        health, meditation, and martial application.`,
        parent_id: null,
    },
    {
        id: 5,
        name: "History",
        title: "蔡李佛",
        category: 1,
        description: `Chen's Tai Chi (陳氏太極拳) is the oldest and original form of Tai Chi Chuan. 
        Characterized by its distinctive silk-reeling movements, explosive power, and low stances, Chen style 
        combines slow, flowing movements with sudden bursts of speed and power. It is an excellent practice for 
        health, meditation, and martial application.`,
        parent_id: 4,
    },
    {
        id: 6,
        name: "Forms",
        title: "蔡李佛",
        category: 1,
        description: `Chen's Tai Chi (陳氏太極拳) is the oldest and original form of Tai Chi Chuan. 
        Characterized by its distinctive silk-reeling movements, explosive power, and low stances, Chen style 
        combines slow, flowing movements with sudden bursts of speed and power. It is an excellent practice for 
        health, meditation, and martial application.`,
        parent_id: 4
    },
    {
        id: 7,
        name: "Chen Tai Chi",
        title: "陳氏太極拳",
        category: 1,
        description: `Chen's Tai Chi (陳氏太極拳) is the oldest and original form of Tai Chi Chuan. 
        Characterized by its distinctive silk-reeling movements, explosive power, and low stances, Chen style 
        combines slow, flowing movements with sudden bursts of speed and power. It is an excellent practice for 
        health, meditation, and martial application.`,
        parent_id: 4
    },
    {
        id: 8,
        name: "Sifu Paul Tam",
        title: "譚師傅",
        category: 2,
        description: `Sifu Paul Tam is a highly respected martial arts master with decades of experience in Choy Lee Fat 
        and Chen's Tai Chi. His dedication to preserving traditional martial arts while adapting to modern teaching 
        methods has made him a beloved instructor in the community.`,
        parent_id: null,
    }, 
    {
        id: 9,
        name: "Tony Yuen",
        title: "阮師傅",
        category: 2,
        description: `Tony Yuen is an accomplished martial artist and instructor, known for his expertise in both 
        Choy Lee Fat techniques and Tai Chi principles. His patient teaching style and deep knowledge make him 
        an invaluable asset to the CLF Kung Fu Club.`,
        parent_id: null,
    }

];


