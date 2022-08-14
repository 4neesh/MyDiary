import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DiaryEntry } from "./dairy-entry.model";

@Injectable({providedIn:"root"})
export class DiaryDataService{

    updateEntry(index: number, entry: DiaryEntry) {
      this.diaryEntries[index] = entry;
      this.diarySubject.next(this.diaryEntries);
    }
    
    public diarySubject = new Subject<DiaryEntry[]>();
    private diaryEntries: DiaryEntry[] = [
        new DiaryEntry("Jan 1st", "Entry 1"),
        new DiaryEntry("Jan 2nd", "Entry 2"),        
        new DiaryEntry("Jan 3rd", "Entry 3"),        
    ];

    onDeleteEntry(id: number){
        this.diaryEntries.splice(id, 1);
        this.diarySubject.next(this.diaryEntries);
    }

    getDiaryEntries(){
        return this.diaryEntries;
    }

    getDiaryEntry(index: number){
        return {...this.diaryEntries[index]};
    }

    onAddDiaryEntry(diaryEntry: DiaryEntry){
        this.diaryEntries.push(diaryEntry);
        this.diarySubject.next(this.diaryEntries);
    }
}