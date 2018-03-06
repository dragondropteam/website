/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

export class ReleaseFile {
  _id?: string;
  platform: string;
  file: string;
}

export class Release {
  _id?: string;
  version: string;
  channel: string;
  changeNotes: string;
  published: Date;
  files: ReleaseFile[];
}

