export const result = {
  methods: {
    generateGameResultString(liveResult) {
      // Check if the game is loading
      if (this.$store.getters['game/loading_game']) {
        // Return placeholder data
        return '(0 - 0), (0 - 0)';
      }

      const resultsWithNonZeroFollowing = liveResult.runs.map((run, index, array) => {
        const homeRunsTotal = run.home.reduce((sum, current) => sum + current, 0);
        const awayRunsTotal = run.away.reduce((sum, current) => sum + current, 0);

        const hasNonZeroZeroFollowing = array.slice(index + 1).some(nextRun => {
          const nextHomeTotal = nextRun.home.reduce((sum, current) => sum + current, 0);
          const nextAwayTotal = nextRun.away.reduce((sum, current) => sum + current, 0);
          return nextHomeTotal !== 0 || nextAwayTotal !== 0;
        });

        if (homeRunsTotal !== 0 || awayRunsTotal !== 0 || hasNonZeroZeroFollowing) {
          return `(${homeRunsTotal} - ${awayRunsTotal})`;
        }

        return null;
      }).filter(result => result !== null).join(', ');

      return resultsWithNonZeroFollowing;
    },

    calculatePoints(liveResult) {
      // Check if the game is loading
      if (this.$store.getters['game/loading_game']) {
        // Return placeholder points
        return { home: 0, away: 0 };
      }

      const points = { home: 0, away: 0 };
      const { periods, runs } = liveResult;

      // Evaluate the first two periods
      if (periods.home > periods.away) points.home += 1;
      else if (periods.away > periods.home) points.away += 1;

      // Sum runs for the first two runs entries (if available)
      for (let i = 0; i < Math.min(2, runs.length); i++) {
        const homeRuns = runs[i].home.reduce((sum, current) => sum + current, 0);
        const awayRuns = runs[i].away.reduce((sum, current) => sum + current, 0);
        if (homeRuns > awayRuns) points.home += 1;
        else if (awayRuns > homeRuns) points.away += 1;
      }

      // Handle tiebreakers and limits
      if (points.home === points.away) {
        if (points.home === 2) { // If both first sections are tied
          // Each team gets 1 point
          points.home = 1;
          points.away = 1;
        } else {
          // Continue to play until a winner is found
          for (let i = 2; i < runs.length; i++) {
            const homeRuns = runs[i].home.reduce((sum, current) => sum + current, 0);
            const awayRuns = runs[i].away.reduce((sum, current) => sum + current, 0);
            if (homeRuns > awayRuns) {
              points.home = 2;
              break;
            } else if (awayRuns > homeRuns) {
              points.away = 2;
              break;
            }
          }
        }
      }

      // Ensure points do not exceed 2
      points.home = Math.min(2, points.home);
      points.away = Math.min(2, points.away);

      return points;
    },
  },
};