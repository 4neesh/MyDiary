import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DiaryEntry } from "./dairy-entry.model";

@Injectable({providedIn:"root"})
export class DiaryDataService{

    constructor(private http: HttpClient){}

    updateEntry(index: number, entry: DiaryEntry) {
      this.diaryEntries[index] = entry;
      this.diarySubject.next(this.diaryEntries);
    }
    
    public diarySubject = new Subject<DiaryEntry[]>();
    private diaryEntries: DiaryEntry[] = [];

    onDeleteEntry(id: number){
        this.diaryEntries.splice(id, 1);
        this.diarySubject.next(this.diaryEntries);
    }

    getDiaryEntries(){
        this.http.get<{diaryEntries: DiaryEntry[]}>('http://localhost:3000/diary-entries').subscribe((jsonData) => {
            this.diaryEntries = jsonData.diaryEntries;
            this.diarySubject.next(this.diaryEntries);
        })
    }

    getDiaryEntry(index: number){
        return {...this.diaryEntries[index]};
    }

    onAddDiaryEntry(diaryEntry: DiaryEntry){
        this.diaryEntries.push(diaryEntry);
        this.diarySubject.next(this.diaryEntries);
    }
}