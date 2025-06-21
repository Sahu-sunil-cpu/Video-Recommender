const users = ["u1", "u2", "u3", "u4"];
const videos = ["v1", "v2", "v3", "v4", "v5"];

const watchHistory = [
    { user: 'u1', video: 'v1' },
    { user: 'u1', video: 'v2' },
    { user: 'u2', video: 'v2' },
    { user: 'u2', video: 'v3' },
    { user: 'u3', video: 'v1' },
    { user: 'u3', video: 'v4' },
    { user: 'u4', video: 'v2' },
    { user: 'u4', video: 'v3' },
    { user: 'u4', video: 'v5' },
];


// {u1: {v1, v2, v3}}
interface Map {
    [user: string]: Set<string>
}

//   interface Map1 {
//      [string]: {}
//   }

function MapUserToVideo() {
    const map: Map = {}
    users.forEach(user => map[user] = new Set<string>());  // {user: Set of videos}
    watchHistory.forEach(({ user, video }) => map[user]?.add(video));
    return map;
}


const jaccard = (setA: any, setB: any) => {
    const intersection = new Set([...setA].filter(x => setB.has(x)));  // set of videos -> [v1, v2]
    const union = new Set([...setA, ...setB]);  // [v1, v2, v1, v3]
    return intersection.size / union.size; // 2/4 = 0.5
};


const recommend = (targetUser: any) => {
    const userMap = MapUserToVideo();
    const targetVideos = userMap[targetUser];

    // Find most similar user
    let mostSimilar = null;
    let maxScore = 0;

    for (let user of users) {
        if (user === targetUser) continue;
        const score = jaccard(targetVideos, userMap[user]); // except current user
        if (score > maxScore) {
            maxScore = score;
            mostSimilar = user;
        }
    }


    console.log("matched user:", mostSimilar)
    const similarUserVideos = userMap[mostSimilar as string];

    if (!similarUserVideos) {
        return "not successful";
    }
    const recommendations = Array.from(similarUserVideos).filter(video => !targetVideos?.has(video));

    console.log(`Recommendations for ${targetUser}:`, recommendations);
};

recommend('u1');
