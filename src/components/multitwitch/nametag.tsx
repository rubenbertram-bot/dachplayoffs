interface NameProps{
    name: string;
    ign: string;
}

export const Nametag: React.FC<NameProps> = ({name, ign}) => {
    return (
        <div className="bg-transparent font-sans text-2xl font-extralight rounded-md text-white absolute flex gap-2 items-center">
            
            <span
                className="font-[Playoffs] text-white text-3xl"
                style={{
                    textShadow: `
      -2px -2px 0 #000,
       2px -2px 0 #000,
      -2px  2px 0 #000,
       2px  2px 0 #000,
       0px  0px 4px #000
    `,
                }}
            >
  {name.toUpperCase()}
</span>
        </div>
    )
}
