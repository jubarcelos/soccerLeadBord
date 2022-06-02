// // import { StatusCodes } from 'http-status-codes';
// import { IMatch } from '../interfaces/IMatch';
// import MatchModel from '../database/models/Match';
// // import RequestError from '../helper/RequestError';

// class CreateMatchService {
//   public create = async (body: IMatch) => {
//     const {
//       homeTeam,
//       awayTeam,
//       homeTeamGoals,
//       awayTeamGoals,
//       inProgress,
//     } = body;

//     // const matchListed = await MatchModel.findOne({ where: { homeTeam, awayTeam, inProgress } });
//     const newMatch = await MatchModel.create({
//       homeTeam,
//       awayTeam,
//       homeTeamGoals,
//       awayTeamGoals,
//       inProgress,
//     });

//     // if (matchListed) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Team already exists');
//     return newMatch;
//   };
// }

// export default CreateMatchService;
