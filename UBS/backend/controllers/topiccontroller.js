const getTotalQuizzes = async (req, res) => {
    try {
        const itemsRef = admin.database().ref("Quiz");
        const snapshot = await itemsRef.once('value');
        if (!snapshot.exists()) {
            return res.status(404).send({ error: "No data found at the specified location in the database." });
        }
        const mainbody = snapshot.val();
        const totalNumber = Object.keys(mainbody).length;
        const topics = totalNumber / 3;
        return res.status(200).json({ totalNumber, topics, mainbody });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error retrieving data from Firebase.' });
    }
}


const getSpecificTopic = async (req, res) => {
    const topicParams = req.params.topic;
    try {
        const itemsRef = admin.database().ref('Quiz').orderByKey().startAt(`${topicParams}_`).endAt(`${topicParams}_\uf8ff`);
        const snapshot = await itemsRef.once('value');
        if (!snapshot.exists()) {
            return res.status(404).send({ error: "No data found at the specified location in the database." });
        }
        const data = snapshot.val();
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error retrieving data from Firebase.' });
    }
}


module.exports = {
    getTotalQuizzes,
    getSpecificTopic
}