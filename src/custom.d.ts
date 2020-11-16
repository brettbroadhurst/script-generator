declare module "*.css" {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
      const content: string;
      export default content;
}

declare module "*.jpg" {
      const content: string;
      export default content;
}

declare module "*.png" {
      const content: string;
      export default content;
}

declare module "*.json" {
      const content: string;
      export default content;
}
