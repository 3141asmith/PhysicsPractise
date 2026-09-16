// Browser-only question bank for GitHub Pages and local previews.
(() => {
  const tidy = text => String(text).replace(/\b\d+\.\d{9,}\b/g, value => Number(Number(value).toPrecision(7)).toString());
  const variant = (topic, key, index) => {
    let hash = 2166136261;
    for (const character of `${topic}:${key}:${index}`) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
    const value = hash >>> 0;
    return ['binary', 'nucleons', 'counts', 'induction', 'activity'].includes(key) ? 1 + value % 10 : 1 + (value % 7201) / 800;
  };
  const questions = QUESTIONS.map(question => ({...question}));
  for (const question of questions) {
    question.prompt = tidy(question.prompt);
    question.steps = question.steps.map(tidy);
    question.hints = question.hints || (question.type === 'written' ? [
      'Identify the physical principle and define the key terms in the question.',
      `Start by considering this point: ${question.steps[0]}`,
      `Develop the explanation further: ${question.steps[Math.min(1, question.steps.length - 1)]}`
    ] : [
      `Identify the unknown and list the supplied quantities. Give your final answer in ${question.unit || 'the requested form'}.`,
      question.steps[0],
      question.steps.length > 2 ? question.steps[1] : 'Rearrange the relationship for the unknown, substitute consistently, and check the size of your result.'
    ]);
    question.revealedHints = [];
  }
  window.STATIC_BANK = {topics: TOPICS, questions};
  window.STATIC_VARIANT = variant;
})();