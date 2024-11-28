interface DreamTypes {
  title: string;
  date: Date | null;
  content: string;
  dreamDate: Date | null;
}

interface DreamListsProps {
  dreams: DreamTypes[];
}

export default function DreamLists({ dreams }: DreamListsProps) {
  if (!dreams || dreams.length === 0) {
    return <div>No dreams available</div>;
  }

  const renderDreams = dreams?.map((dream: DreamTypes) => {
    const { title, date, content, dreamDate } = dream;
    return (
      <div className="border-b p-4" key={dream.content}>
        <div> {title ?? "title"} </div>
        <div> Today: {date?.toString()} </div>
        <div> Dream day: {dreamDate?.toString()}</div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  });

  return <div>{renderDreams}</div>;
}
