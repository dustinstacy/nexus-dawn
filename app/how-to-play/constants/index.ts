import ruleBasics from '../../assets/page-images/ruleBasics.png';
import ruleMoves from '../../assets/page-images/ruleMoves.png';
import ruleWins from '../../assets/page-images/ruleWins.png';
import ruleExtendBattle from '../../assets/page-images/ruleExtendBattle.png';
import ruleScore from '../../assets/page-images/ruleScore.png';


export const howToPlay = [
  {
    header: 'How to Play: Standard Rules',
    body: [
      {
        title: 'THE BASICS',
        content: [
          'Nexus Dawn is a strategic two-player card game played on a 3x3 grid.',
          'Each player starts with five unique cards and competes to control more grid spaces than their opponent.',
          'The starting player is randomly selected and will be visually indicated by a golden glow effect around their profile icon',
        ],
        imageSrc: ruleBasics,
      },
      {
        title: 'MAKING A MOVE',
        content: [
          'On your turn: Place one card on any empty grid space.',
          'Each card shows four edge values (top, bottom, left, right) and displays your player color.',
          'When placing adjacent to an opponent\'s card: The game automatically compares touching edges (top-to-bottom or side-to-side).',
          'When your edge value is higher, you capture their card - it flips to display your color. If their value is higher, your card will be captured instead.',
          'Important: Cards can only be captured during your turn when you place a new card.',
        ],
        imageSrc: ruleMoves,
      },
      {
        title: 'CAPTURE THE WIN',
        content: [
          'Round end: When all nine grid spaces are filled, the player controlling more cards wins.',
          'Live tracking: The current score is displayed on the left side of the screen during gameplay.',
          'Tie game: If players control equal numbers of cards, the round ends in a draw.',
        ],
        imageSrc: ruleWins,
      },
    ],
  },
  {
    header: 'Multiple Rounds',
    body: [
      {
        title: 'EXTENDING THE BATTLE',
        content: [
          'As users progress, they will encounter stronger opponents who possess a greater arsenal of cards.',
          'These battles consist of multiple rounds, determined by the round count specified for the opponent.',
          'Each round follows the same rules as a standard battle, but with an additional scoring system.',
        ],
        imageSrc: ruleExtendBattle,
      },
      {
        title: 'KEEPING SCORE',
        content: [
          'Each player will have a counter to keep track of how many cumulative cards they have captured throughout the battle.',
          'The battle concludes either when all the rounds are completed or when one player has taken a lead greater than the maximum score the opponent can obtain for that battle.',
          'If both players have an equal number of captures by the end of the battle, it results in a draw.',
        ],
        imageSrc: ruleScore,
      },
      {
        title: 'GREATER KNOWLEDGE',
        content: [
          'These battles challenge players to showcase their skills and strategic thinking as they strive to outscore their opponents and emerge victorious.',
          'The higher the stakes, the greater the reward—only the sharpest minds will rise to the top!',
        ],
      },
    ],
  },
];
