import { Between, getRepository } from 'typeorm';
import { Request } from 'express';
import { Track } from '../entity/Track';
import stringSimilarity from 'string-similarity';


export class TrackController {
  private trackRepository = getRepository(Track);

  async save(request: Request) {
    console.log(request.body);
    try {
      return this.trackRepository.save(request.body);
    } catch (err) {
      throw err;
    }
  }

  async match(request: Request) {
    const tracks = request.body.tracks;
    const matchesMap = await Promise.all(tracks.map(async (track, idx) => {
      const matches = await this.trackRepository.find({
        where: {
          durationInSeconds: Between(track.durationInSeconds - 2, track.durationInSeconds + 2),
        }
      })

      const nameMatches = matches.filter(match => {
        return stringSimilarity.compareTwoStrings(match.name, track.name) > 0.75;
      });

      if (!nameMatches.length) return null;

      return {
        idx,
        match: matches[stringSimilarity.findBestMatch(track.name, nameMatches.map(match => match.name)).bestMatchIndex]
      };
    }));
    return matchesMap.filter(match => match !== null)
  }
}
