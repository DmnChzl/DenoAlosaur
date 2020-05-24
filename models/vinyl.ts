interface Track {
  title: string;
  artists: string[];
  length: number;
}

export interface Vinyl {
  title: string;
  artist: string;
  label: string;
  released: number;
  genres: string[];
  tracklist: Track[];
}

interface ObjectID {
  _id: {
    $oid: string;
  };
}

export type VinylDocument = ObjectID & Vinyl;
