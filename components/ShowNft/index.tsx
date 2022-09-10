import NftContainer from "./NftContainer";

type Props = {};
const ShowNft = ({}: Props) => {
  return (
    <div>
      {collection.map((data, i) => (
        <NftContainer
          key={i}
          collectionName={data.collectionName}
          items={data.items}
        />
      ))}
    </div>
  );
};

const collection: {
  collectionName: string;
  items: { title: string; img: string }[];
}[] = [
  {
    collectionName: "Learn web 3 Dao",
    items: [
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/DpAt0fCxyOO68sUC4bVwTltG3GQ72BJQU9JXoxKguzDnDR9vfdqBWF633cFWP72_wxDl5f6BFh9k-JeSsUllSfHfxU_8hPEwIrwTS7E=w600",
      },
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/NK5AN5NSqoWkFZEOckUxbzn66KVSqA2F13fFlIAlEJgHreAZCtmYYLn6NgD9OuHpcKR-_Tfb4RnVcOCRJIed1vbUEzw7De5YklkmXQ=w600",
      },
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/DpAt0fCxyOO68sUC4bVwTltG3GQ72BJQU9JXoxKguzDnDR9vfdqBWF633cFWP72_wxDl5f6BFh9k-JeSsUllSfHfxU_8hPEwIrwTS7E=w600",
      },
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/NK5AN5NSqoWkFZEOckUxbzn66KVSqA2F13fFlIAlEJgHreAZCtmYYLn6NgD9OuHpcKR-_Tfb4RnVcOCRJIed1vbUEzw7De5YklkmXQ=w600",
      },
    ],
  },
  {
    collectionName: "Buildspace",
    items: [
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/DpAt0fCxyOO68sUC4bVwTltG3GQ72BJQU9JXoxKguzDnDR9vfdqBWF633cFWP72_wxDl5f6BFh9k-JeSsUllSfHfxU_8hPEwIrwTS7E=w600",
      },
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/NK5AN5NSqoWkFZEOckUxbzn66KVSqA2F13fFlIAlEJgHreAZCtmYYLn6NgD9OuHpcKR-_Tfb4RnVcOCRJIed1vbUEzw7De5YklkmXQ=w600",
      },
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/DpAt0fCxyOO68sUC4bVwTltG3GQ72BJQU9JXoxKguzDnDR9vfdqBWF633cFWP72_wxDl5f6BFh9k-JeSsUllSfHfxU_8hPEwIrwTS7E=w600",
      },
      {
        title: "Sophomore Graduate 🎓",
        img: "https://lh3.googleusercontent.com/NK5AN5NSqoWkFZEOckUxbzn66KVSqA2F13fFlIAlEJgHreAZCtmYYLn6NgD9OuHpcKR-_Tfb4RnVcOCRJIed1vbUEzw7De5YklkmXQ=w600",
      },
    ],
  },
];

export default ShowNft;
