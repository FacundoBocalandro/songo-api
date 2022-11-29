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

      const bestMatch = stringSimilarity.findBestMatch(track.name, matches.map(match => match.name));
      if (bestMatch.bestMatch.rating < 0.75) return null;

      return {
        idx,
        match: matches[bestMatch.bestMatchIndex]
      };
    }));
    return matchesMap.filter(match => match !== null)
  }
}
