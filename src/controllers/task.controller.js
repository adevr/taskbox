const {Task, Tag} = require("../models/index")

module.exports = {
    store: async (req, res, next) => {
        let {title, description, tags, weekday, periodicity} = req.body

        let tagsSelected = "";
        if (tags !== undefined) {
            for (let i = 0; i < tags.length; i++) {
                if (isNaN(Number(tags[i]))) {
                    const newTag = await Tag.create({
                        title: tags[i],
                        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    })
                    tagsSelected += (i+1 === tags.length) ? `${newTag.id}` : `${newTag.id},`
                }else {
                    tagsSelected += (i+1 === tags.length) ? `${tags[i]}` : `${tags[i]},`
                }
            }
        }

        const newTask = await Task.create({
            title: title,
            description: description,
            dayweek: weekday,
            tags: tagsSelected,
            periodicity_id: periodicity,
            userId: req.session.userId,
            status: 1
        });

        res.redirect("/")
    },

    update: async (req, res, next) => {
        const userId = req.session.userId
        const taskId = req.params.taskId
        let {title, description, tags, weekday, periodicity} = req.body

        let tagsSelected = "";
        if (tags !== undefined) {
            for (let i = 0; i < tags.length; i++) {
                if (isNaN(Number(tags[i]))) {
                    const newTag = await Tag.create({
                        title: tags[i],
                        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    })
                    tagsSelected += (i+1 === tags.length) ? `${newTag.id}` : `${newTag.id},`
                }else {
                    tagsSelected += (i+1 === tags.length) ? `${tags[i]}` : `${tags[i]},`
                }
            }
        }

        const  task = await Task.findByPk(taskId)
        task.title = title
        task.description = description
        task.weekday = weekday
        task.periodicityId = periodicity
        await task.save()

        res.redirect("/daily")
    },

    destroy: async(req, res, next) => {
        const {taskId} = req.params

        const task = await Task.findByPk(taskId)
        if(task != null){
            task.deleted_at = Date.now()
            await task.save()
        }

        res.redirect("/daily")
    },

    markCompleted: async(req, res, next) => {
        const {taskId} = req.params
        const task = await Task.findByPk(taskId)
        if(task != null){
            task.status=(task.status === 1) ? 0 : 1
            await task.save()
        }

        res.json({success: task, code:200})
    }

}