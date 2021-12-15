
const tg = require('./tg');
const entities = require('@jetbrains/youtrack-scripting-api/entities');
const datetime = require('@jetbrains/youtrack-scripting-api/date-time');

exports.rule = entities.Issue.onChange({

  title: 'Notify-new-issue',
  guard: (ctx) => {

    return ctx.issue.becomesReported;
  },
  action: (ctx) => {
    const issue = ctx.issue;

    let message = `<a href='${issue.url}'><b>${issue.id}</b>: ${issue.summary}</a>
Тип: ${issue.fields.Type.name}
Приоритет: ${issue.fields.Priority.name}
Срок выполнения: ${datetime.format(ctx.issue.fields['Срок выполнения'], 'dd.MM.yyyy')}
Автор: ${issue.reporter.visibleName}`;
    tg.sendMessage(message);

  },
  requirements: {
    // TODO: add requirements
  }
});