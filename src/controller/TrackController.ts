import { Between, getRepository } from 'typeorm';
import { Request } from 'express';
import { Track } from '../entity/Track';
import stringSimilarity from 'string-similarity';


export class TrackController {
  private trackRepository = getRepository(Track);

  async save(request: Request) {
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
          bitrate: track.bitrate,
          durationInSeconds: Between(track.durationInSeconds - 5, track.durationInSeconds + 5),
        }
      })

      if (!matches.length) return null;

      return {
        idx,
        match: matches[stringSimilarity.findBestMatch(track.name, matches.map(match => match.name)).bestMatchIndex]
      };
    }));
    return matchesMap.filter(match => match !== null)
  }
}
