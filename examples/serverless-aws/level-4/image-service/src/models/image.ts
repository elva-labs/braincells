export interface Image {
  data: {
    name?: string;
    key?: string;
    type?: string;
    format?: {
      width: number;
      height: number;
    };
    buffer?: Buffer | Uint8Array;
  };
}

/**
 * A custom Image type used to represent the image objects uploaded, stored, and transformed. The model only has a constructor function to create new image objects.
 */

export class Image implements Image {
  constructor(data: {
    name?: string;
    key?: string;
    type?: string;
    format?: {
      width: number;
      height: number;
    };
    buffer?: Buffer | Uint8Array;
  }) {
    this.data = {};
    this.data.name = data.name;
    this.data.key = data.key;
    this.data.type = data.type;
    this.data.buffer = data.buffer;

    if (data.format) {
      this.data.format = {
        height: data.format.height,
        width: data.format.width,
      };
    }
  }
}
