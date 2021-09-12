const startMoney = 5;
const userHeyoka = {
  id: 0,
  name: 'Heyoka',
  money: startMoney,
};

const userMagicalRainbow = {
  id: 1,
  name: 'Magical Rainbow',
  money: startMoney,
};

const userCharlie = {
  id: 2,
  name: 'Charlie',
  money: startMoney,
};

const dynamicUsers = [];
for (var x=0; x<100; x++) {
  dynamicUsers.push({
    id: 3+x,
    name: `Dynamic User ${x}`,
    money: startMoney,
  });
}

const users = [userHeyoka, userMagicalRainbow, userCharlie, ...dynamicUsers];

const cacheApplesAreSweet = {
  id: 3,
  negative: {
    name: '...',
    money: 0,
    historicMoney: 0,
  },
  positive: {
    name: 'Apples are Sweet!',
    money: 0,
    historicMoney: 0,
  },
};

const ledgerApplesAreSweet = [
  [0, 1],
  [1, 1],
  [2, 1],
];

dynamicUsers.forEach(user => {
  ledgerApplesAreSweet.push([user.id, Math.random() > 0.9 ? 1 : -1])
});

function Transaction(spread) {
  Object.keys(spread).forEach((key) => {
    this[key] = spread[key];
  });
}

const processedLineItems = [];
const transactionCollection = [];
const formatMoney = (amount) => amount.toFixed(2);
ledgerApplesAreSweet.forEach((lineItem, idx) => {
  const pendingTransaction = {};
  const [originId, qty] = lineItem;
  const thisUser = users[originId];
  processedLineItems.push(lineItem);
  const polarity = qty < 0 ? 'negative' : 'positive';
  const quantity = Math.abs(qty);

  // Transfer funds from the user to the appropriate jackpot chest
  const thisCoffer = { name: polarity === 'negative' ? 'Coffer--' : 'Coffer++' };
  cacheApplesAreSweet[polarity].money += quantity;
  cacheApplesAreSweet[polarity].historicMoney += quantity;
  users[originId].money -= quantity;

  transactionCollection.push(
    new Transaction({
      [thisUser.name]: `(-${formatMoney(quantity)})\n$${formatMoney(thisUser.money)}`,
      [thisCoffer.name]: `(+${formatMoney(quantity)})\n$${formatMoney(cacheApplesAreSweet[polarity].money)}`,
    }),
  );

  // Determine the total historic balance
  const historicBalance = cacheApplesAreSweet.positive.historicMoney - cacheApplesAreSweet.negative.historicMoney;

  // Determine the polarity (ratification) of this ledger
  const ledgerPolarity = historicBalance > 0;

  // Based on the ledger polarity, disburse all loser funds to winners

  // Create a list of contributors and total contributions
  const totals = { positive: 0, negative: 0 };
  const contributors = processedLineItems.reduce((acc, [originId, qty]) => ({ ...acc, [originId]: (acc[originId] || 0) + qty }), {});
  Object.keys(contributors).forEach((contributorId) => {
    const qty = contributors[contributorId];
    const quantity = Math.abs(qty);
    const polarity = qty > 0;
    const posNeg = polarity ? 'positive' : 'negative';
    totals[posNeg] += quantity;
  });

  // Work out payout ratios
  const ratios = {};
  Object.keys(contributors).forEach((contributorId) => {
    const qty = contributors[contributorId];
    const quantity = Math.abs(qty);
    const polarity = qty > 0;
    const posNeg = polarity ? 'positive' : 'negative';
    if (polarity === ledgerPolarity) {
      ratios[contributorId] = 1 / (totals[posNeg] / quantity);
    } else {
      ratios[contributorId] = 0;
    }
  });
  console.log(contributors, totals, ratios);

  // Commit transfers
  const transactionReport = {};
  var cofferReduction = 0;
  const sourcePolarityName = ledgerPolarity ? 'negative' : 'positive';
  Object.keys(ratios).forEach((userId) => {
    const thisCoffer = { name: sourcePolarityName === 'negative' ? 'Coffer--' : 'Coffer++' };
    const amountForThisUser = cacheApplesAreSweet[sourcePolarityName].money * ratios[userId];
    cacheApplesAreSweet[sourcePolarityName].money -= amountForThisUser;
    users[userId].money += amountForThisUser;
    if (amountForThisUser > 0) {
      transactionReport[users[userId].name] = `(+${formatMoney(amountForThisUser)})\n$${formatMoney(users[userId].money)}`;
      cofferReduction += amountForThisUser;
    }
  });
  transactionCollection.push(
    new Transaction({
      ...transactionReport,
      [thisCoffer.name]: `(-${formatMoney(cofferReduction)})\n$${formatMoney(cacheApplesAreSweet[sourcePolarityName].money)}`,
    }),
  );
});

console.table(transactionCollection);
