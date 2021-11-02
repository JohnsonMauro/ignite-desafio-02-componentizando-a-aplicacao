import { useState, useEffect } from "react";

import { Button } from "../components/Button";

import { api } from "../services/api";

import GenreResponseProps from "./interfaces/GenreResponse";

interface SideBarProps {
  onClickButton(id: number): void;
  selected: number;
}

export function SideBar({ onClickButton, selected }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            id={String(genre.id)}
            key={genre.id}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClickButton(genre.id)}
            selected={selected === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
