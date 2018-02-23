export class Release {
  _id?: string;
  version: string;
  channel: string;
  changeNotes: string;
  published: Date;
  platforms: {
    windows: [{
      _id?: string;
      file: string;
    }];
    linux: [{
      _id?: string;
      file: string;
    }];
    mac: [{
      _id?: string;
      file: string;
    }];
  };
}

