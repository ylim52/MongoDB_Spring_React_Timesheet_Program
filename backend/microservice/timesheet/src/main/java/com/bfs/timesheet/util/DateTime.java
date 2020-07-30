package com.bfs.timesheet.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.Locale;

public class DateTime {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");

        String date = "06/25/2020";

        // default, ISO_LOCAL_DATE
        // Local US start date: Sunday -> Saturday
        LocalDate localDate = LocalDate.parse(date, formatter);

        DayOfWeek firstDayOfWeek = WeekFields.of(Locale.getDefault()).getFirstDayOfWeek();
        LocalDate startOfCurrentWeek = localDate.with(TemporalAdjusters.previousOrSame(firstDayOfWeek));

        DayOfWeek lastDayOfWeek = firstDayOfWeek.plus(6); // or minus(1)
        LocalDate endOfWeek = localDate.with(TemporalAdjusters.nextOrSame(lastDayOfWeek));

        LocalDate printDate = startOfCurrentWeek;

//        System.out.println("Date: "+ localDate);
//        System.out.println("Day of the week: " + localDate.getDayOfWeek());
//        System.out.println("Start of the week: " + startOfCurrentWeek.format(formatter));
//        System.out.println("End of the week: " + endOfWeek.format(formatter));
        for(int i =0 ; i<7; i++){
            if(!printDate.getDayOfWeek().toString().equals("SUNDAY") && !printDate.getDayOfWeek().toString().equals("SATURDAY")) {
                System.out.println(printDate.format(formatter) + " " +  printDate.getDayOfWeek());
            }
            printDate = printDate.plusDays(1);
        }
    }
}
