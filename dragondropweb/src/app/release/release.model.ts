export class Release {
  _id?: string;
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

