$("#inputStateTags").select2({
    width: 'resolve',
    tags: true,
    tokenSeparators: [',', ' ']
})

$("div[id^=edit-modal-task] #inputStateTags").select2({
    width: 'resolve',
    tags: true,
    tokenSeparators: [',', ' ']
})

$("div[id^=view-modal-task] #inputStateTags").select2({
    width: 'resolve',
    tags: true,
    tokenSeparators: [',', ' ']
})

$("input[type=checkbox][id^=task-]").change(function () {
    var id = $(this).attr("data-task-id")
    $.post(`/task/mark/${id}`, function (data) {
        window.location.replace("/daily")
    });
})

