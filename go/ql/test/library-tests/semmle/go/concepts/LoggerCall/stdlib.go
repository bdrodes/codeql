package main

import (
	"log"
)

func stdlib() {
	var logger log.Logger
	logger.SetPrefix("prefix: ")
	logger.Fatal(text)       // $ logger=text
	logger.Fatalf(fmt, text) // $ logger=fmt logger=text
	logger.Fatalln(text)     // $ logger=text
	logger.Panic(text)       // $ logger=text
	logger.Panicf(fmt, text) // $ logger=fmt logger=text
	logger.Panicln(text)     // $ logger=text
	logger.Print(text)       // $ logger=text
	logger.Printf(fmt, text) // $ logger=fmt logger=text
	logger.Println(text)     // $ logger=text

	// components corresponding to the format specifier "%T" are not considered vulnerable
	logger.Fatalf("%s: found type %T", text, v) // $ logger="%s: found type %T" logger=text type-logger=v
	logger.Panicf("%s: found type %T", text, v) // $ logger="%s: found type %T" logger=text type-logger=v
	logger.Printf("%s: found type %T", text, v) // $ logger="%s: found type %T" logger=text type-logger=v

	log.SetPrefix("prefix: ")
	log.Fatal(text)       // $ logger=text
	log.Fatalf(fmt, text) // $ logger=fmt logger=text
	log.Fatalln(text)     // $ logger=text
	log.Panic(text)       // $ logger=text
	log.Panicf(fmt, text) // $ logger=fmt logger=text
	log.Panicln(text)     // $ logger=text
	log.Print(text)       // $ logger=text
	log.Printf(fmt, text) // $ logger=fmt logger=text
	log.Println(text)     // $ logger=text

	// components corresponding to the format specifier "%T" are not considered vulnerable
	log.Fatalf("%s: found type %T", text, v) // $ logger="%s: found type %T" logger=text type-logger=v
	log.Panicf("%s: found type %T", text, v) // $ logger="%s: found type %T" logger=text type-logger=v
	log.Printf("%s: found type %T", text, v) // $ logger="%s: found type %T" logger=text type-logger=v
}
